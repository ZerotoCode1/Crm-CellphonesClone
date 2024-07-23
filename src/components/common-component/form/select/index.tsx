import { Option } from "@/interfaces/common";
import { Select as SelectAdnt } from "antd";
import { CSSProperties } from "react";
import Label from "../label";

interface Props {
  defaultValue?: string;
  options: Option[];
  onChange?: (value: string, option: Option | Option[]) => void;
  placeholder: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  mode?: "multiple" | "tags" | undefined;
  value?: any;
  title: string;
  required?: boolean;
}

const Select = (props: Props) => {
  const { required, title, defaultValue, options, onChange, placeholder, disabled = false, className = "", style, mode = undefined, value } = props;

  return (
    <>
      <div className="">
        <Label title={title} required={required} />
      </div>
      <SelectAdnt
        mode={mode}
        style={style}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        options={options}
        onChange={onChange && onChange}
        placeholder={placeholder}
        className={`${className} h-[40px]`}
      />
    </>
  );
};

export default Select;
