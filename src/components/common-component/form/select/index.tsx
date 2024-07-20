import { Option } from "@/interfaces/common";
import { Select as SelectAdnt } from "antd";
import { CSSProperties } from "react";

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
}

const Select = (props: Props) => {
  const { defaultValue, options, onChange, placeholder, disabled = false, className = "", style, mode = undefined, value } = props;

  return (
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
  );
};

export default Select;
