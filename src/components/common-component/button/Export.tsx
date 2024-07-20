import { Button as ButtonAntd, ButtonProps } from "antd";
import { iconsSvg } from "../../icons-svg/index";

interface Props extends ButtonProps {}

const ExportButton = (props: Props) => {
  const { ...params } = props;
  return (
    <ButtonAntd icon={<iconsSvg.FileExcel />} {...params}>
      Export Excel
    </ButtonAntd>
  );
};

export default ExportButton;
