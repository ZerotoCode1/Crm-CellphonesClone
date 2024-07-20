import { Button as ButtonAntd, ButtonProps } from "antd";
import { iconsSvg } from "../../icons-svg/index";

interface Props extends ButtonProps {}

const ImportButton = (props: Props) => {
  const { ...params } = props;
  return (
    <ButtonAntd icon={<iconsSvg.Import />} {...params}>
      Import Excel
    </ButtonAntd>
  );
};

export default ImportButton;
