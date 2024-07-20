import { useState } from "react";

interface Props {
  item: DeviceBrand;
  index: number;
  maxLength: number;
}

export interface DeviceBrand {
  name: string;
  devices: Device[];
}

interface Device {
  name: string;
  os: string;
}

const DropDownDevice = (props: Props) => {
  const { item, index, maxLength } = props;
  const { name, devices } = item;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      key={item.name}
      style={{
        borderBottom: index !== maxLength - 1 ? "1px solid #D6D6D6" : "",
        paddingBottom: "8px",
      }}
    >
      <div className="header-drop-down flex justify-between items-center py-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="title-drop-down font-bold text-[14px]">{name}</div>
        <DropDownIcon isOpen={isOpen} />
      </div>
      <div className={`content-drop-down transtion  max-h-0 overflow-hidden transition-all duration-300 ${isOpen && "max-h-[1000px]"}`}>
        <div className="">
          {devices?.map((item: Device) => {
            return (
              <div className=" font-medium text-[14px] pl-2 mb-2" style={{ borderLeft: "2px solid #D6D6D6" }}>
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DropDownDevice;

const DropDownIcon = ({ isOpen }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`${isOpen ? "rotate-180 transition-all duration-300" : "rotate-0 transition-all duration-300"}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.4107 6.91082C4.73614 6.58539 5.26378 6.58539 5.58922 6.91082L9.99996 11.3216L14.4107 6.91082C14.7361 6.58539 15.2638 6.58539 15.5892 6.91082C15.9146 7.23626 15.9146 7.7639 15.5892 8.08934L10.5892 13.0893C10.2638 13.4147 9.73613 13.4147 9.41071 13.0893L4.4107 8.08934C4.08527 7.7639 4.08527 7.23626 4.4107 6.91082Z"
        fill="#5C5C5C"
      />
    </svg>
  );
};
