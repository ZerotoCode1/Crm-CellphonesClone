import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const ContainerBox = (props: Props) => {
  const { children } = props;
  return <div className="p-4 border-border border rounded-sm">{children}</div>;
};

export default ContainerBox;
