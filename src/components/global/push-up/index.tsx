import React, { useState, useImperativeHandle } from "react";
import PushUp, { PushUpConfirmProps } from "./children/PushUp";

export interface GlobalPushUpConfirmRef {
  open: (data: PushUpConfirmProps) => void;
  close: () => void;
}

const GlobalPushUpConfirm = React.forwardRef((_props, ref) => {
  const [popupData, setPopupData] = useState<PushUpConfirmProps>({
    open: false,
    content: <></>,
  });

  useImperativeHandle(ref, () => ({
    open: (data: PushUpConfirmProps) => {
      setPopupData(data);
    },
    close: () => {
      setPopupData({ open: false });
    },
  }));

  return <PushUp {...popupData} />;
});

export default GlobalPushUpConfirm;
