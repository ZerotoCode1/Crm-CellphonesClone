import { Input, InputProps } from "antd";
import Label from "../label";
import { ILabel } from "../label/index";

interface Props extends Omit<InputProps & ILabel, "input"> {}

const InputTextArea = (props: Props | any) => {
  const { TextArea } = Input;
  return (
    <>
      <Label title={props.title} required={props.required} />
      <TextArea maxLength={200} {...props} />
    </>
  );
};

export default InputTextArea;
