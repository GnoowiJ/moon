import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ko";
import dayjs from "dayjs";

export default function PickDate({ name, getDateValue, defVal }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          format="YYYY-MM-DD"
          label={name}
          onChange={(newValue) => getDateValue(newValue.format("YYYY-MM-DD"))}
          disablePast={true}
          defaultValue={dayjs(defVal)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
