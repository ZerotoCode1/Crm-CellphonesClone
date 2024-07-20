import { RouteType } from "@/interfaces/common";
import SidebarItem from "./SideBarItem";
import SidebarItemCollapse from "./SideBarItemCollapse";
import { useState } from "react";
import { BaseRoute } from "@/constants/baseRoute";
import { PERMISSION_ALL, PERMISSION_ENUM } from "@/interfaces/enum";
import { iconsSvg } from "../icons-svg";
import { colors } from "@/colors";
import { useNavigate } from "react-router-dom";
import NavMobile from "./NavMobile";
import { useAuth } from "@/providers/AuthenticationProvider";

interface Props {
  heightHeader: number;
}

const Sidebar = (_props: Props) => {
  const pathUrl = location.pathname;
  const pathArr = pathUrl?.split("/");
  const pathCurrent = pathArr[2];

  const [pathOpen, setPathOpen] = useState<string>(pathCurrent ? pathCurrent : "");
  const [isNavMobile, setIsNavMobile] = useState<boolean>(false);

  const navigate = useNavigate();

  const onSetPathOpen = (path: string) => {
    setPathOpen(path);
  };
  const { user } = useAuth();
  const renderNavbar = () => {
    return appRoutes.filter((item: RouteType) => item.roles.includes(user?.roleId || PERMISSION_ENUM.SYSTEMADMIN));
  };
  return (
    <div className="" style={{ width: isNavMobile ? "100px" : "300px" }}>
      <div
        className="style_scroll"
        style={{
          paddingTop: "30px",
          padding: "16px 16px 16px 16px",
          width: "100%",
          background: "white",
          height: `100vh`,
          overflowY: "scroll",
          borderRight: `1px solid ${colors.border.main}`,
          position: "relative",
        }}
      >
        <div className=" absolute right-[0px] top-[24px] z-10" onClick={() => setIsNavMobile(!isNavMobile)}>
          {<iconsSvg.LayoutSidebar />}
        </div>
        <div className="pb-3" onClick={() => navigate(BaseRoute.Homepage)}>
          <iconsSvg.Logo style={{ width: isNavMobile ? "50px" : "81px" }} />
        </div>
        {isNavMobile ? (
          <>
            <NavMobile appRoutes={renderNavbar()} />
          </>
        ) : (
          <>
            {renderNavbar().map((route: RouteType, index) => {
              return !route.isChild ? (
                <SidebarItem key={index} item={route}></SidebarItem>
              ) : (
                <SidebarItemCollapse key={index} item={route} onSetPathOpen={onSetPathOpen} pathOpen={pathOpen} />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

const appRoutes: RouteType[] = [
  {
    id: 1,
    path: BaseRoute.Homepage,
    displayText: "Trang chủ",
    Icon: iconsSvg.Home,
    isChild: false,
    roles: PERMISSION_ALL,
  },

  {
    id: 2,
    roles: PERMISSION_ALL,
    displayText: "Quản lý đơn hàng",
    Icon: iconsSvg.Cart,
    isChild: true,
    children: [
      {
        displayText: "Tất cả đơn hàng (eSim)",
        path: BaseRoute.ManagementOrderInformationEsim,
        roles: PERMISSION_ALL,
      },
      {
        displayText: "Đơn hàng lỗi",
        path: BaseRoute.ManagementOrderInformationEsimError,
        roles: PERMISSION_ALL,
      },
    ],
    pathChildren: ["esim", "esim-error"],
  },
  {
    id: 3,
    path: BaseRoute.CustomerManagement,
    displayText: "Quản lý khách hàng",
    Icon: iconsSvg.Customers,
    isChild: false,
    roles: PERMISSION_ALL,
  },
  {
    id: 4,
    path: BaseRoute.AccountManagement,
    displayText: "Quản lý tài khoản",
    Icon: iconsSvg.User,
    isChild: false,
    roles: [PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS],
  },
  {
    id: 5,
    roles: PERMISSION_ALL,
    displayText: "Quản lý portal",
    Icon: iconsSvg.Portal,
    isChild: true,
    children: [
      {
        displayText: "Liên hệ skyfi",
        path: BaseRoute.ContactsSkyfi,
        roles: PERMISSION_ALL,
      },
      {
        displayText: "Tin tức",
        path: BaseRoute.News,
        roles: PERMISSION_ALL,
      },
      {
        displayText: "Quản lý thiết bị",
        path: BaseRoute.DeviceManagement,
        roles: PERMISSION_ALL,
      },
    ],
    pathChildren: ["contact-skyfi", "device-management", "news"],
  },
  {
    id: 6,
    path: BaseRoute.Category,
    displayText: "Quản lý danh mục",
    Icon: iconsSvg.Package,
    isChild: false,
    roles: [PERMISSION_ENUM.SALEOPS, PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS],
  },
  {
    id: 7,
    path: BaseRoute.ListSoldEsim,
    displayText: "Danh sách sản phẩm",
    Icon: iconsSvg.SimCard,
    isChild: false,
    roles: PERMISSION_ALL,
  },
  {
    id: 8,
    path: BaseRoute.ListExchangeRate,
    displayText: "Danh sách tỷ giá",
    Icon: iconsSvg.Payment,
    isChild: false,
    roles: [PERMISSION_ENUM.SYSTEMOPS, PERMISSION_ENUM.SYSTEMADMIN],
  },
  {
    id: 9,
    roles: [PERMISSION_ENUM.SALEOPS, PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS],
    displayText: "Quản lý đối soát",
    Icon: iconsSvg.ControlManager,
    isChild: true,
    children: [
      {
        displayText: "Gpay",
        path: BaseRoute.Gpay,
        roles: PERMISSION_ALL,
      },
      {
        displayText: "Airalo",
        path: BaseRoute.Airalo,
        roles: PERMISSION_ALL,
      },
    ],
    pathChildren: ["gpay", "airalo"],
  },
];
