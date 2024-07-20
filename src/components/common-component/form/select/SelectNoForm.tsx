import { Option } from "@/interfaces/common";
import { Select as SelectAdnt } from "antd";
import { iconsSvg } from "../../../icons-svg/index";

interface Props {
  defaultValue?: string;
  options: Option[];
  onChange?: (value: string, optiop: Option | any) => void;
  placeholder?: string;
}

const SelectNoForm = (props: Props) => {
  const { defaultValue, options, onChange, placeholder } = props;
  return (
    <SelectAdnt
      defaultValue={defaultValue}
      style={{ width: "100%", height: 40 }}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      suffixIcon={<iconsSvg.ChevronDown />}
    />
  );
};

export default SelectNoForm;
