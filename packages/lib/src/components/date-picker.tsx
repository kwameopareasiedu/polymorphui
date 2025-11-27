import React, {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { InputAddon, InputError, InputHelper, InputInput, InputLabel, InputWrapper } from "@/components/input-helpers";
import { usePolymorphUi } from "@/providers/polymorphui-provider";
import { Popup } from "@/components/popup";
import { cn, combineRefs } from "@/utils";
import CalendarIcon from "../assets/calendar.svg";
import ArrowLeftIcon from "../assets/arrow-left.svg";
import ArrowRightIcon from "../assets/arrow-right.svg";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const currentDjs = dayjs();

type InputDateType = string | Date;

export enum DatePickerFormat {
  D_M_Y = "d/m/y",
  M_D_Y = "m/d/y",
}

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "children" | "placeholder"> {
  label?: ReactNode;
  leading?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  format?: `${DatePickerFormat}`;
  validator?: (date: string) => string;
  range?: [InputDateType | undefined, InputDateType | undefined];
  value?: InputDateType;
  onChange?: (e: { target: { value: string } }) => void;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  {
    label,
    leading,
    id,
    className,
    format: _format = "d/m/y",
    range,
    validator,
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
      let iso = djs.format("YYYY-MM-DD");

      // if (minDate && djs.isBefore(minDate)) iso = dayjs(minDate).format("YYYY-MM-DD");
      // if (maxDate && djs.isAfter(maxDate)) iso = dayjs(maxDate).format("YYYY-MM-DD");
      if (validator) iso = validator(iso);

      onChange?.({ target: { value: iso } });
    } else {
      const fallback = dayjs().format("YYYY-MM-DD");
      onChange?.({ target: { value: fallback } });
    }
  };

  const handleSelectCalendarDate = (date: string) => {
    onChange?.({ target: { value: date } });
    setIsOpen(false);
    inputRef.current?.focus();
  };

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
    <div
      className={resolveClassName(
        "datePicker",
        "datePicker relative w-full flex flex-col gap-0.5",
        undefined,
        className,
      )}>
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
          placement="bottom-end"
          onChange={setIsOpen}>
          <button type="button">
            <CalendarIcon {...({ className: "w-4 h-4" } as object)} />
          </button>

          <DatePickerCalendar date={value} validator={validator} range={range} onSelect={handleSelectCalendarDate} />
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

interface DatePickerCalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  range?: [InputDateType | undefined, InputDateType | undefined];
  validator?: (date: string) => string;
  date?: string | Date;
  onSelect: (date: string) => void;
}

const DatePickerCalendar = forwardRef<HTMLDivElement, DatePickerCalendarProps>(function DatePickerCalendar(
  { date, className, range, validator, onSelect, ...rest }: DatePickerCalendarProps,
  ref,
) {
  const { resolveClassName } = usePolymorphUi();

  const [dateDjs] = useState(dayjs(date).isValid() ? dayjs(date) : currentDjs.clone());
  const [viewDjs, setViewDjs] = useState(dateDjs.clone());

  const [yearOptions, calendarDjsList] = useMemo(() => {
    const yearOptions = Array(100)
      .fill(null)
      .map((_, idx) => viewDjs.year() + idx - 50);

    const offset = viewDjs.date(1).day();
    const daysInCalendar = 7 * Math.ceil((offset + viewDjs.daysInMonth()) / 7);
    const calendarDays = Array(daysInCalendar)
      .fill(null)
      .map((_, idx) => viewDjs.date(1).add(idx - offset, "day"));

    return [yearOptions, calendarDays];
  }, [viewDjs]);

  const handleSelectMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setViewDjs(viewDjs.month(value));
  };

  const handleSelectYear = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setViewDjs(viewDjs.year(value));
  };

  const handleCycleDate = (offset: 1 | -1, unit: "month" | "year") => {
    setViewDjs(viewDjs.add(offset, unit));
  };

  const handleSelectDate = (djs: dayjs.Dayjs) => {
    onSelect(djs.format("YYYY-MM-DD"));
  };

  return (
    <div
      ref={ref}
      className={resolveClassName(
        "datePickerCalendar",
        "datePickerCalendar grid grid-cols-2 gap-2 p-2 w-auto max-w-72",
        "rounded-lg bg-white shadow-lg border-[1px] border-gray-300 z-[100]",
        className,
      )}
      {...rest}>
      <nav className="flex items-center gap-1">
        <button type="button" className="p-1.5" onClick={() => handleCycleDate(-1, "month")}>
          <ArrowLeftIcon {...({ className: "w-5 h-5" } as object)} />
        </button>

        <select className="bg-transparent" value={viewDjs.month()} onChange={handleSelectMonth}>
          <option value={0}>Jan</option>
          <option value={1}>Feb</option>
          <option value={2}>Mar</option>
          <option value={3}>Apr</option>
          <option value={4}>May</option>
          <option value={5}>Jun</option>
          <option value={6}>Jul</option>
          <option value={7}>Aug</option>
          <option value={8}>Sep</option>
          <option value={9}>Oct</option>
          <option value={10}>Nov</option>
          <option value={11}>Dec</option>
        </select>

        <button type="button" className="p-1.5" onClick={() => handleCycleDate(1, "month")}>
          <ArrowRightIcon {...({ className: "w-5 h-5" } as object)} />
        </button>
      </nav>

      <nav className="flex items-center gap-1">
        <button type="button" className="p-1.5" onClick={() => handleCycleDate(-1, "year")}>
          <ArrowLeftIcon {...({ className: "w-5 h-5" } as object)} />
        </button>

        <select className="bg-transparent" value={viewDjs.year()} onChange={handleSelectYear}>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button type="button" className="p-1.5" onClick={() => handleCycleDate(1, "year")}>
          <ArrowRightIcon {...({ className: "w-5 h-5" } as object)} />
        </button>
      </nav>

      <div className="col-span-full grid grid-cols-7 gap-0">
        <p className="text-center text-sm text-gray-500">Su</p>
        <p className="text-center text-sm text-gray-500">Mo</p>
        <p className="text-center text-sm text-gray-500">Tu</p>
        <p className="text-center text-sm text-gray-500">We</p>
        <p className="text-center text-sm text-gray-500">Th</p>
        <p className="text-center text-sm text-gray-500">Fr</p>
        <p className="text-center text-sm text-gray-500">Sa</p>

        {calendarDjsList.map((itemDjs, idx) => {
          const cdjsIso = itemDjs.format("YYYY-MM-DD");

          return (
            <button
              type="button"
              key={idx}
              className={resolveClassName(
                "datePickerCalendarDay",
                "datePickerCalendarDay grid place-items-center aspect-square disabled:opacity-25 disabled:hover:cursor-not-allowed",
                cn(
                  "text-sm enabled:data-[selected=true]:bg-primary enabled:data-[selected=true]:text-white",
                  "enabled:hover:bg-primary/25 data-[in-month=false]:opacity-25",
                  "enabled:data-[selected=false]:data-[in-range=true]:!bg-primary/10",
                ),
              )}
              disabled={validator && validator(cdjsIso) !== cdjsIso}
              data-selected={dateDjs.isSame(itemDjs, "day")}
              data-in-month={viewDjs.month() === itemDjs.month()}
              data-in-range={
                range?.[0] &&
                range?.[1] &&
                (dateDjs.isSame(range[0], "day") || dateDjs.isSame(range[1], "day")) &&
                itemDjs.isSameOrAfter(range[0], "day") &&
                itemDjs.isSameOrBefore(range[1], "day")
              }
              onClick={() => handleSelectDate(itemDjs)}>
              {itemDjs.format("DD")}
            </button>
          );
        })}

        <button
          type="button"
          className="col-span-full text-xs uppercase pt-1 pb-2"
          onClick={() => handleSelectDate(dayjs())}>
          Today
        </button>
      </div>
    </div>
  );
});
