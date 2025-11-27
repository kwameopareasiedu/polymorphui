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
import { combineRefs } from "@/utils";
import CalendarIcon from "../assets/calendar.svg";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Tooltip } from "@/components/tooltip";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const currentDjs = dayjs();

type InputDateType = string | Date;

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "children"> {
  label?: ReactNode;
  leading?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  format?: string;
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
    placeholder,
    format = "DD/MM/YY",
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
  const [buffer, setBuffer] = useState("");

  const handleSelectCalendarDate = (date: string) => {
    onChange?.({ target: { value: date } });
    setIsOpen(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const djs = dayjs(value ?? "");

    if (djs.isValid()) {
      setBuffer(djs.format(format));
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
            placeholder={placeholder}
            value={buffer}
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
            <CalendarIcon {...({ className: "size-4" } as object)} />
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

interface DatePickerCalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  range?: [InputDateType | undefined, InputDateType | undefined];
  validator?: (date: string) => string | null;
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
    const yearOptions = Array(50)
      .fill(null)
      .map((_, idx) => viewDjs.year() + idx - 25);

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

  const handleSelectDate = (djs: dayjs.Dayjs) => {
    onSelect(djs.format("YYYY-MM-DD"));
  };

  const handleShowToday = () => {
    setViewDjs(currentDjs.clone());
  };

  return (
    <div
      ref={ref}
      className={resolveClassName(
        "datePickerCalendar",
        "datePickerCalendar grid grid-cols-2 gap-2 p-2 w-auto overflow-hidden space-y-2",
        "rounded-lg bg-white shadow-lg border border-gray-300 z-[100]",
        className,
      )}
      {...rest}>
      <nav className="col-span-full flex items-center gap-2 p-2 -m-2 bg-slate-100">
        <select className="bg-transparent text-sm" value={viewDjs.month()} onChange={handleSelectMonth}>
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

        <select className="bg-transparent text-sm" value={viewDjs.year()} onChange={handleSelectYear}>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <span className="flex-1" />

        <Tooltip description="Today" className="z-[100]">
          <button
            type="button"
            className="disabled:opacity-20 disabled:cursor-not-allowed"
            onClick={handleShowToday}
            disabled={viewDjs.isSame(dateDjs, "month")}>
            <CalendarIcon {...({ className: "size-4" } as object)} />
          </button>
        </Tooltip>
      </nav>

      <div className="col-span-full grid grid-cols-7 gap-1">
        <p className="text-center text-sm text-gray-500">Su</p>
        <p className="text-center text-sm text-gray-500">Mo</p>
        <p className="text-center text-sm text-gray-500">Tu</p>
        <p className="text-center text-sm text-gray-500">We</p>
        <p className="text-center text-sm text-gray-500">Th</p>
        <p className="text-center text-sm text-gray-500">Fr</p>
        <p className="text-center text-sm text-gray-500">Sa</p>

        {calendarDjsList.map((itemDjs, idx) => {
          const itemDjsIso = itemDjs.format("YYYY-MM-DD");

          return (
            <button
              key={idx}
              type="button"
              className={resolveClassName(
                "datePickerCalendarDay",
                "datePickerCalendarDay grid place-items-center aspect-square rounded disabled:opacity-25 disabled:hover:cursor-not-allowed",
                "data-[selected=false]:border data-[today=true]:border-dashed data-[today=true]:border-primary " +
                  "enabled:data-[selected=true]:bg-primary enabled:data-[selected=true]:text-white " +
                  "enabled:hover:bg-primary/25 data-[in-month=false]:opacity-25 " +
                  "enabled:data-[selected=false]:data-[in-range=true]:!bg-primary/10",
              )}
              disabled={validator && validator(itemDjsIso) !== itemDjsIso}
              data-today={itemDjs.isSame(currentDjs, "day")}
              data-selected={itemDjs.isSame(dateDjs, "day")}
              data-in-month={itemDjs.month() === viewDjs.month()}
              data-in-range={
                range?.[0] &&
                range?.[1] &&
                (dateDjs.isSame(range[0], "day") || dateDjs.isSame(range[1], "day")) &&
                itemDjs.isSameOrAfter(range[0], "day") &&
                itemDjs.isSameOrBefore(range[1], "day")
              }
              onClick={() => handleSelectDate(itemDjs)}>
              {itemDjs.format("D")}
            </button>
          );
        })}
      </div>
    </div>
  );
});
