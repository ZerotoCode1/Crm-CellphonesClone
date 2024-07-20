import { RouteType } from "@/interfaces/common";
// import { useAuth } from "@/providers/AuthenticationProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iconsSvg } from "../icons-svg/index";
import { colors } from "@/colors";

interface Props {
  item: RouteType;
  onSetPathOpen: (path: string) => void;
  pathOpen: string;
}

const SidebarItemCollapse = (props: Props) => {
  const { onSetPathOpen, pathOpen, item } = props;
  // const { user } = useAuth();
  // const roleUser = user?.roleId;
  const { displayText, children, Icon, pathChildren } = item;

  const checkOpen = () => {
    return pathChildren?.includes(`${pathOpen}`);
  };

  const [isOpen, setIsOpen] = useState<boolean>(checkOpen() ?? false);

  const navigate = useNavigate();
  // const pathUrl = location.pathname;

  // const checkRole = (roles: string[]) => {
  //   if (roleUser) {
  //     return roles.includes(roleUser) ?? false;
  //   }
  // };

  return (
    <>
      <div
        className={`sidebar-item header-collapse-sidebar flex justify-between items-center py-3 px-3 cursor-pointer  hover:rounded-sm mb-1`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: `${colors.text.sidebar}` }}
      >
        <div className="flex items-center gap-x-2">
          <Icon />
          <p className="title-sidebar">{displayText}</p>
        </div>
        <iconsSvg.ChevronDown
          style={!isOpen ? { transform: "rotate(0deg)", transition: "all 0.5s" } : { transform: "rotate(180deg)", transition: "all 0.5s" }}
        />
      </div>
      <div className="content" style={isOpen ? { ...openSearchExtend } : { ...closeSearchExtend }}>
        <div className=" list-disc my-1">
          {children?.map((item, index) => {
            return (
              <div
                key={index}
                className="child-sidebar-item pl-[35px] cursor-pointer py-[12px] flex items-center hover:bg-[#fdba74] hover:rounded-sm hover:text-white mb-1"
                style={item.path === location.pathname ? { background: "#fdba74", borderRadius: "8px" } : {}}
                onClick={() => {
                  navigate(item.path);
                  const pathArr = item.path.split("/");
                  onSetPathOpen(pathArr[2] ?? "");
                }}
              >
                <div
                  className="dot-sidebar w-[6px] h-[6px] rounded-[50%] bg-[gray] mr-2"
                  style={item.path === location.pathname ? { background: "white" } : {}}
                ></div>
                <p style={item.path === location.pathname ? { color: "white" } : {}} className={`title-sidebar-child text-[#666]`}>
                  {item.displayText}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SidebarItemCollapse;

const closeSearchExtend = {
  overflow: "hidden",
  maxHeight: "0",
  transition: "all 0.5s",
};

const openSearchExtend = {
  ...closeSearchExtend,
  maxHeight: "1000px",
};
