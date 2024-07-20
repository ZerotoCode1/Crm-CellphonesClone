import { createContext, useCallback, useContext, useMemo, useState } from "react";

type VersionOperation = {
  ios: string;
  android: string;
};
const isCollapsed = localStorage.getItem("collapsed") === String(true);
interface StateGlobalContextI {
  versionOperation: VersionOperation;
  hanldesetVersionOperation: (version: VersionOperation) => void;
  handleVersionOperationCollapsed: (value: boolean) => void;
  collapsedContext: boolean;
}

const StateGlobalContextI = createContext<StateGlobalContextI>({
  versionOperation: { ios: "", android: "" },
  hanldesetVersionOperation: () => {},
  handleVersionOperationCollapsed: () => {},
  collapsedContext: false,
});

export const useStateGlobal = () => useContext(StateGlobalContextI);

const StateGlobalProvider = ({ children }: { children: any }) => {
  //! State
  const [versionOperation, setVersionOperation] = useState<VersionOperation>({
    ios: "0",
    android: "0",
  });
  const [collapsedContext, setVersionOperationCollapsed] = useState<boolean>(isCollapsed);
  //! Function

  const hanldesetVersionOperation = useCallback((version: VersionOperation) => {
    setVersionOperation(version);
  }, []);
  const handleVersionOperationCollapsed = (value: boolean) => {
    setVersionOperationCollapsed(value);
  };
  //! Return
  const value = useMemo(() => {
    return {
      versionOperation,
      hanldesetVersionOperation,
      handleVersionOperationCollapsed,
      collapsedContext,
    };
  }, [versionOperation, hanldesetVersionOperation, hanldesetVersionOperation, collapsedContext]);

  return <StateGlobalContextI.Provider value={value}>{children}</StateGlobalContextI.Provider>;
};

export default StateGlobalProvider;
