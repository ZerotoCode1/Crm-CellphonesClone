import { Switch as SwitchAntd, SwitchProps as AntdSwitchProps } from "antd";
import React from "react";

interface SwitchProps extends AntdSwitchProps {}

const Switch: React.FC<SwitchProps> = (props) => {
  return <SwitchAntd {...props} />;
};

export default Switch;
