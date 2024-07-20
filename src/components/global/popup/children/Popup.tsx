import PopupService from "@/services/popupPage";
import React, { CSSProperties, useEffect } from "react";

export interface PopupConfirmProps {
  visible: boolean;
  content?: React.ReactNode | string;
  onHidePopup?: () => void;
  title: string | React.ReactNode;
  styleContent?: CSSProperties;
  className?: string;
  classNameSub?: string;
}

const PopupConfirm = (props: PopupConfirmProps) => {
  const { visible, onHidePopup, content, title, styleContent, className = "", classNameSub } = props;
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [visible]);

  if (!visible) return <div />;

  const onHanldeHidePopup = () => {
    onHidePopup ? onHidePopup() : PopupService?.instance?.current?.close();
  };

  return (
    <div className={`${className} popup overlay`}>
      <div className="w-full md:w-[500px] bg-white p-4 rounded-[16px] max-h-[90%]" style={{ ...styleContent }}>
        <div className={`relative ${classNameSub}`}>
          <div className="text-[18px] font-bold  pt-1">{title}</div>
          <div className=" absolute popup_close right-2 top-2" onClick={onHanldeHidePopup}>
            <IconClose />
          </div>
        </div>
        <div className="">{content}</div>
      </div>
    </div>
  );
};
export default PopupConfirm;

const IconClose = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={13} fill="none" style={{ cursor: "pointer" }}>
      <path stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m11 1.5-10 10m0-10 10 10" style={{ cursor: "pointer" }} />
    </svg>
  );
};
