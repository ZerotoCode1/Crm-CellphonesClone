import { useEffect, useState } from "react";

export const useGetHeightHeader = (classElement: string) => {
  const [tag, setTag] = useState<any>({});

  useEffect(() => {
    const ele = document.querySelector(`.${classElement}`);
    setTag(ele);
  }, [document.querySelector(classElement)]);

  const height = Math.ceil(tag?.offsetHeight);
  const width = Math.ceil(tag?.offsetWidth);

  return { height, width };
};
