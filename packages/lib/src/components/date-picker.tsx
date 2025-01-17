import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { InputAddon, InputError, InputHelper, InputInput, InputLabel, InputWrapper } from "@/components/input-helpers";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { VariantNameType } from "@/config/variant";
import { Popup } from "@/components/popup";
import { combineRefs } from "@/utils";
import CalendarIcon from "../assets/calendar.svg";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export enum DatePickerFormat {
  D_M_Y = "d/m/y",
  M_D_Y = "m/d/y",
}

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "children" | "placeholder"> {
  variant?: VariantNameType | VariantNameType[];
  label?: ReactNode;
  leading?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  format?: `${DatePickerFormat}`;
  value?: string | Date;
  onChange?: (e: { target: { value: string } }) => void;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  {
    variant,
    label,
    leading,
    id,
    className,
    format: _format = "d/m/y",
    helper,
    error,
    value,
    onChange,
    ...rest
  }: DatePickerProps,
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolveClassName } = usePolymorphUi();
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [buffer, setBuffer] = useState("");

  const format = useMemo(() => {
    if (_format === DatePickerFormat.D_M_Y) {
      return "DD/MM/YYYY";
    } else if (_format === DatePickerFormat.M_D_Y) {
      return "MM/DD/YYYY";
    } else throw new Error(`Invalid format: ${_format}`);
  }, [_format]);

  const _className = resolveClassName(
    "datePicker",
    variant,
    "datePicker relative w-full flex flex-col gap-0.5",
    undefined,
    className,
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const transformers = getTransformers(format);

    for (let i = 0; i < transformers.length; i++) {
      const t = transformers[i];

      if (t.regex.test(val)) {
        setPlaceholder(t.placeholder);
        setBuffer(t.transform?.(val) ?? val);

        // If first or last transformer is used, parse the date buffer
        if ([0, transformers.length - 1].includes(i)) {
          handleParseBuffer(val);
        }

        break;
      }
    }
  };

  const handleParseBuffer = (buffer: string) => {
    const djs = dayjs(buffer, format);

    if (!buffer) {
      onChange?.({ target: { value: "" } });
    } else if (djs.isValid()) {
      const iso = djs.format("YYYY-MM-DD");
      onChange?.({ target: { value: iso } });
    } else {
      const fallback = dayjs().format("YYYY-MM-DD");
      onChange?.({ target: { value: fallback } });
    }
  };

  // const handleSelectCalendarDate = (date: Date) => {
  //   onChange?.({ target: { date } });
  //   setIsOpen(false);
  //   inputRef.current?.focus();
  // };

  useEffect(() => {
    const djs = dayjs(value ?? "");

    if (djs.isValid()) {
      setBuffer(djs.format(format));
      setPlaceholder("");
    } else {
      const transformers = getTransformers(format);
      setPlaceholder(transformers[0].placeholder);
      setBuffer("");
    }
  }, [value, format]);

  return (
    <div className={_className}>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

      <InputWrapper>
        {leading && <InputAddon>{leading}</InputAddon>}

        <div className="relative z-0 font-mono flex-1 [&>input]:w-full">
          <InputInput
            {...rest}
            type="text"
            ref={combineRefs(ref, inputRef)}
            value={buffer}
            onChange={handleInputChange}
          />

          <InputInput
            className="absolute left-0 top-0 text-gray-400 pointer-events-none -z-[1]"
            value={placeholder}
            tabIndex={-1}
            readOnly
          />
        </div>

        <Popup
          open={isOpen}
          offset={[0, 4]}
          openEvent="triggerClick"
          closeEvent={["triggerClick", "outsideClick"]}
          placement="bottom-start"
          onChange={setIsOpen}>
          <button type="button">
            <CalendarIcon {...({ className: "w-4 h-4" } as object)} />
          </button>

          <div>{/* TODO: Implement picker */}</div>
        </Popup>
      </InputWrapper>

      {(helper || error) && (
        <div className="flex items-center justify-between gap-2">
          {error && <InputError>{error}</InputError>}
          {helper && <InputHelper>{helper}</InputHelper>}
        </div>
      )}
    </div>
  );
});

function getTransformers(
  format: "DD/MM/YYYY" | "MM/DD/YYYY",
): { regex: RegExp; transform?: (val: string) => string; placeholder: string }[] {
  const isDMY = format === "DD/MM/YYYY";

  return [
    { regex: /^$/, placeholder: isDMY ? "dd/mm/yyyy" : "mm/dd/yyyy" },
    { regex: /^\d$/, placeholder: isDMY ? " d/mm/yyyy" : " m/dd/yyyy" },
    { regex: /^\d\d$/, placeholder: isDMY ? "  /mm/yyyy" : "  /dd/yyyy" },
    {
      regex: /^\d\d\d$/,
      transform: (v) => `${v.slice(0, 2)}/${v[2]}`,
      placeholder: isDMY ? "    m/yyyy" : "    d/yyyy",
    },
    { regex: /^\d\d\/$/, placeholder: isDMY ? "   mm/yyyy" : "   dd/yyyy" },
    { regex: /^\d\d\/\d$/, placeholder: isDMY ? "    m/yyyy" : "    d/yyyy" },
    { regex: /^\d\d\/\d\d$/, placeholder: "     /yyyy" },
    {
      regex: /^\d\d\/\d\d\d$/,
      transform: (v) => `${v.slice(0, 5)}/${v[5]}`,
      placeholder: "       yyy",
    },
    { regex: /^\d\d\/\d\d\/$/, placeholder: "      yyyy" },
    { regex: /^\d\d\/\d\d\/\d$/, placeholder: "       yyy" },
    { regex: /^\d\d\/\d\d\/\d\d$/, placeholder: "        yy" },
    { regex: /^\d\d\/\d\d\/\d\d\d$/, placeholder: "         y" },
    { regex: /^\d\d\/\d\d\/\d\d\d\d$/, placeholder: "          " },
  ];
}
