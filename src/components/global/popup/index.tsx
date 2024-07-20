import React, { useState, useImperativeHandle } from "react";
import PopupConfirm, { PopupConfirmProps } from "./children/Popup";

export interface GlobalPopupConfirmRef {
  open: (data: PopupConfirmProps) => void;
  close: () => void;
}

const GlobalPopupConfirm = React.forwardRef((_props, ref) => {
  const [popupData, setPopupData] = useState<PopupConfirmProps>({
    visible: false,
    title: "",
  });

  useImperativeHandle(ref, () => ({
    open: (data: PopupConfirmProps) => {
      setPopupData(data);
    },
    close: () => {
      setPopupData({ visible: false, title: "" });
    },
  }));

  return <PopupConfirm {...popupData} />;
});

export default GlobalPopupConfirm;
