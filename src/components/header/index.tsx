import { colors } from "@/colors";
import { classCommon, indexElement } from "@/constants/common";
import { useAuth } from "@/providers/AuthenticationProvider";
import { useStateGlobal } from "@/providers/StateGlobalProvider";
import PopupService from "@/services/popupPage";
import { Popover, Tooltip } from "antd";
import { useEffect, useState } from "react";
import Logout from "../global/popup/children/Logout";
import { iconsSvg } from "../icons-svg";

const Options = (setClose: any) => {
  const { user } = useAuth();

  const handleLogout = () => {
    PopupService.instance.current.open({
      visible: true,
      title: <p className="text-center">Bạn có chắc muốn đăng xuất</p>,
      content: <Logout />,
    });
    setClose(false);
  };

  return (
    <div className="py-2">
      <div className="flex items-center py-1 px-3 hover:bg-gray-100">
        <iconsSvg.UserOutline className=" fill-black mr-2" />
        <p>{user.username}</p>
      </div>
      <div className=" cursor-pointer flex items-center py-1 hover:bg-gray-100 px-3" onClick={handleLogout}>
        <iconsSvg.Logout className="mr-2" />
        <p>Đăng xuất</p>
      </div>
    </div>
  );
};

const Header = () => {
  const { handleVersionOperationCollapsed, collapsedContext } = useStateGlobal();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const username = user?.username ?? "";
  const fisrtCharacter = username.charAt(0);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const toggleCollapsed = () => {
    localStorage.setItem("collapsed", JSON.stringify(!collapsedContext));
    handleVersionOperationCollapsed(!collapsedContext);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        localStorage.setItem("collapsed", JSON.stringify(true));
        handleVersionOperationCollapsed(true);
      } else {
        localStorage.setItem("collapsed", JSON.stringify(false));
        handleVersionOperationCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="relative" style={{ borderBottom: `1px solid ${colors.border.main}` }}>
      <header
        className={`${classCommon.header}  bg-white`}
        style={{
          zIndex: indexElement.header,
          width: `100%`,
        }}
      >
        <div className="flex items-center">
          <div className="flex justify-between w-[257px] ">
            <div
              className={`absolute top-4 left-[-14px] cursor-pointer hover-effect`}
              onClick={toggleCollapsed}
              style={{
                marginBottom: 16,
                backgroundColor: "#FFF",
              }}
            >
              {collapsedContext ? <iconsSvg.ArowRight /> : <iconsSvg.ArowLeft />}
            </div>
          </div>
          <div className="flex-grow flex justify-between py-4 pr-8 pl-8">
            <div className=""></div>
            <div className="">
              <Popover
                content={Options(setOpen)}
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
                style={{ padding: "0" }}
                overlayInnerStyle={{ padding: "0" }}
              >
                <Tooltip></Tooltip>
                <div className="w-[34px] h-[34px] flex justify-center items-center bg-[#fed7aa] rounded-[50%] cursor-pointer uppercase text-white">
                  {fisrtCharacter}
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
