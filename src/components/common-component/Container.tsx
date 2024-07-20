import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  classNameRoot?: string;
}

const Container = ({ children, className, classNameRoot }: Props) => {
  const classContainer =
    "w-full m-0 px-4 md:mr-[3%] md:ml-[3%] md:mr-[5%] md:ml-[5%] xl:mr-[5%] xl:ml-[5%]  xl:max-w-[1400px]";
  return (
    <div className={`${classNameRoot} flex justify-center`}>
      <div className={`${classContainer} ${className}`}>{children}</div>
    </div>
  );
};

export default Container;
