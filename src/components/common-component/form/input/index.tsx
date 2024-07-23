import { Input as InputAndt, InputProps } from "antd";
import Label from "../label";
import { ILabel } from "../label/index";

interface Props extends Omit<InputProps & ILabel, "input"> {
  classLabel?: string;
  required?: boolean;
}

const Input = (props: Props) => {
  const { classLabel, title, required, ...params } = props;

  return (
    <>
      <div className="">
        <Label title={title} required={required} />
      </div>
      <InputAndt allowClear style={{ padding: "8px" }} {...params} />
    </>
  );
};

export default Input;
