import { Input as InputAndt, InputProps } from "antd";
import Label from "../label";
import { ILabel } from "../label/index";

interface Props extends Omit<InputProps & ILabel, "input"> {
  classLabel?: string;
}

const InputPassword = (props: Props) => {
  return (
    <>
      <Label title={props.title} required={props.required} className={props.classLabel} />
      <InputAndt.Password allowClear style={{ padding: "8px" }} {...props} />
    </>
  );
};

export default InputPassword;
