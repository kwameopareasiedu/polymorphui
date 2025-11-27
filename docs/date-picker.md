# Input

[**_Docs_**](../README.md)

An input component which allows entry or selection of a date

```typescript jsx
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { DatePicker } from "polymorphui/date-picker";
import { useState } from "react";

dayjs.extend(isSameOrAfter);

export function Example() {
  const [value, setValue] = useState("");

  return (
    <DatePicker
      value={date}
      label="Select date"
      format="Do MMM YYYY"
      leading={<span className="text-xs font-medium text-gray-400">DD/MM/YYY</span>}
      validator={(date) => {
        const minDate = dayjs("2025-01-15");

        if (minDate.isSameOrAfter(date)) {
          return minDate.format("YYYY-MM-DD");
        } else return "";
      }}
      onChange={(e) => setDate(e.target.value as never)}
    />
  );
}
```

_Extends_ `InputHTMLAttributes<HTMLInputElement>`

| Props        | Description                                                                                                                                                             | Type                                    | Default      |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|--------------|
| `label?`     | Label node                                                                                                                                                              | `ReactNode`                             |              |
| `leading?`   | Component to render to left of input                                                                                                                                    | `ReactNode`                             |              |
| `helper?`    | Helper node to render below input                                                                                                                                       | `ReactNode`                             |              |
| `error?`     | Error node                                                                                                                                                              | `ReactNode`                             |              |
| `format?`    | Display format of the date-picker                                                                                                                                       | `string`                                | `"DD/MM/YY"` |
| `validator?` | Validator function which is called with visible calendar dates in `YYYY-MM-DD` format. For valid days, it return the passed date else `null`. Invalid days are disabled | `(date: string) => string`              |              |
| `value?`     | Value of the input                                                                                                                                                      | `string \| Date`                        |              |
| `onChange?`  | Change handler. Receives the value in in the `YYYY-MM-DD` format                                                                                                        | `ChangeEventHandler<{ value: string }>` |              |
