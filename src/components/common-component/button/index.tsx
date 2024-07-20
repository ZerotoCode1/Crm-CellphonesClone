import { Button as ButtonAntd, ButtonProps } from "antd";
import { ReactNode } from "react";

interface Props extends ButtonProps {
  children: ReactNode;
}

const Button = (props: Props) => {
  const { children, ...params } = props;
  return <ButtonAntd {...params}>{children}</ButtonAntd>;
};

export default Button;
