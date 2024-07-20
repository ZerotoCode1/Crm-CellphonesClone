import { Input as InputAndt, InputProps } from "antd";
import Label from "../label";
import { ILabel } from "../label/index";

interface Props extends Omit<InputProps & ILabel, "input"> {
  classLabel?: string;
}

const Input = (props: Props) => {
  const { classLabel, title, ...params } = props;

  return (
    <>
      <div className="">
        <Label title={title} required={props.required} />
      </div>
      <InputAndt allowClear style={{ padding: "8px" }} {...params} />
    </>
  );
};

export default Input;
