import { useState } from "react";
const useForceUpdate = () => {
  const [rerender, setState] = useState<object>({});

  const handleForceUpdate = () => {
    setState({});
  };
  return { rerender, handleForceUpdate };
};
export default useForceUpdate;
