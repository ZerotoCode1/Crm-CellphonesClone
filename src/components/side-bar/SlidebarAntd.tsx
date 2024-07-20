import { colors } from "@/colors";
import { BaseRoute } from "@/constants/baseRoute";
import { PERMISSION_ALL, PERMISSION_ENUM } from "@/interfaces/enum";
import { useAuth } from "@/providers/AuthenticationProvider";
import { useStateGlobal } from "@/providers/StateGlobalProvider";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { iconsSvg } from "../icons-svg";
type MenuItem = Required<MenuProps>["items"][number];
type CustomMenuItem = MenuItem & {
  roles?: any;
};
interface Props {
  heightHeader: number;
}

const SidebarANTD = (_props: Props) => {
  const { collapsedContext } = useStateGlobal();
  const navigate = useNavigate();
  const location = useLocation();
  const menuchild = localStorage.getItem("menuChild");
  const { user } = useAuth();
  const renderNavbar = (): CustomMenuItem[] => {
    return items.filter((item: CustomMenuItem) => item.roles.includes(user?.roleId || PERMISSION_ENUM.SYSTEMADMIN));
  };

  const hanldeClick = (e: any) => {
    localStorage.setItem("menuParent", e?.keyPath[1]);
    localStorage.setItem("menuChild", e?.key);
    navigate(`${e?.key}`);
  };
  return (
    <div
      className="style_scroll"
      style={{
        paddingTop: "30px",
        width: "100%",
        background: "white",
        height: `100%`,
        overflowY: "scroll",
        borderRight: `1px solid ${colors.border.main}`,
        position: "relative",
      }}
    >
      <div className="flex justify-center p-4">
        <iconsSvg.Logo style={{ width: "81px" }} />
      </div>
      <Menu
        defaultSelectedKeys={[location.pathname.includes(menuchild ?? "") ? menuchild ?? "" : location.pathname]}
        defaultOpenKeys={[collapsedContext ? "" : localStorage.getItem("menuParent") ?? ""]}
        className={`menu-bar  `}
        onClick={hanldeClick}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsedContext}
        items={renderNavbar()}
      />
    </div>
  );
};

export default SidebarANTD;
const items: CustomMenuItem[] = [
  {
    key: BaseRoute.Homepage,
    icon: <iconsSvg.Home color="#707070" />,
    label: "Trang chủ",
    roles: PERMISSION_ALL,
  },
  {
    key: "sub1",
    label: "Quản lý đơn hàng",
    icon: <iconsSvg.Cart color="#707070" />,
    roles: PERMISSION_ALL,
    children: [
      {
        key: BaseRoute.ManagementOrderInformationEsim,
        label: "Tất cả đơn hàng (eSim)",
      },
      {
        key: BaseRoute.ManagementOrderInformationEsimError,
        label: "Đơn hàng lỗi",
      },
    ],
  },
  {
    key: BaseRoute.CustomerManagement,
    icon: <iconsSvg.Customers color="#707070" />,
    label: "Quản lý khách hàng",
    roles: PERMISSION_ALL,
  },
  {
    key: BaseRoute.AccountManagement,
    icon: <iconsSvg.User color="#707070" />,
    label: "Quản lý tài khoản",
    roles: [PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS],
  },
  {
    key: "sub2",
    label: "Quản lý portal",
    icon: <iconsSvg.Portal color="#707070" />,
    roles: PERMISSION_ALL,
    children: [
      {
        label: "Liên hệ skyfi",
        key: BaseRoute.ContactsSkyfi,
      },
      {
        label: "Tin tức",
        key: BaseRoute.News,
      },
      {
        label: "Quản lý thiết bị",
        key: BaseRoute.DeviceManagement,
      },
    ],
  },

  {
    key: BaseRoute.ListPackage,
    icon: <iconsSvg.Package color="#707070" />,
    label: "Danh sách gói cước",
    roles: [PERMISSION_ENUM.SALEOPS, PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS],
  },
  {
    key: BaseRoute.ListSoldEsim,
    icon: <iconsSvg.SimCard color="#707070" />,
    label: "Danh sách Esim đã bán",
    roles: PERMISSION_ALL,
  },
  {
    key: BaseRoute.ListExchangeRate,
    icon: <iconsSvg.Payment color="#707070" />,
    label: "Danh sách tỷ giá",
    roles: [PERMISSION_ENUM.SYSTEMOPS, PERMISSION_ENUM.SYSTEMADMIN],
  },
  {
    key: "sub3",
    label: "Quản lý đối soát",
    icon: <iconsSvg.ControlManager color="#707070" />,
    roles: [PERMISSION_ENUM.SALEOPS, PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS],
    children: [
      {
        key: BaseRoute.Gpay,
        label: "Gpay",
      },
      {
        key: BaseRoute.Airalo,
        label: "Airalo",
      },
    ],
  },
];
