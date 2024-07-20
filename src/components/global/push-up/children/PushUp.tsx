import { indexElement } from "@/constants/common";
import PushUpService from "@/services/pushUpPage";
import { CSSProperties, ReactNode, useEffect } from "react";

export interface PushUpConfirmProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  content?: ReactNode;
  styleContent?: CSSProperties;
}

const PushUp = (props: PushUpConfirmProps) => {
  const { open, onClose, title, content, styleContent } = props;

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        document.body.style.overflow = "hidden";
      }, 200);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const onHanldeClose = () => {
    PushUpService.instance.current.close();
    onClose && onClose();
  };

  return (
    <div
      className="overlay fixed h-screen w-screen bg-[rgba(0,0,0,0.5)] top-0"
      style={{
        zIndex: indexElement.pushUp,
        visibility: open ? "visible" : "hidden",
      }}
    >
      <div className="root relative h-screen w-screen" style={{}}>
        <div
          className="content pb-3 absolute w-full bg-white rounded-t-[16px] bottom-0"
          style={{
            maxHeight: "calc(100% - 50px)",
            bottom: open ? 0 : "-1000px",
            transition: "all 0.5s",
            ...styleContent,
          }}
        >
          <div className="fixed bg-white z-10 w-full rounded-t-[16px]">
            <div className="text-[18px] pl-4 pb-3 pt-5">{title}</div>
            <div className=" absolute right-6 top-6" onClick={onHanldeClose}>
              <IconClose />
            </div>
          </div>
          <div className="px-4 pt-[60px] ">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default PushUp;

const IconClose = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={13} fill="none">
      <path
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m11 1.5-10 10m0-10 10 10"
      />
    </svg>
  );
};
