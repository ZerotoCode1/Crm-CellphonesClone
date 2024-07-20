import { DatePicker as DatePickerAndt, DatePickerProps } from "antd";
import Label, { ILabel } from "../label";
import { typeDate } from "@/helpers/date";

interface Props extends Omit<DatePickerProps & ILabel, "input"> {
  afterOnchange?: () => void;
}

const DatePicker = (props: Props) => {
  const { style, afterOnchange, ...params } = props;
  return (
    <>
      <Label title={props.title} required={props.required} />
      <DatePickerAndt format={typeDate.ddmmyyyy} {...params} style={{ width: "100%", padding: "8px", ...style }} />
    </>
  );
};

export default DatePicker;
