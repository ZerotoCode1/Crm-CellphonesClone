import { colors } from "@/colors";
import { RouteType } from "@/interfaces/common";
import { useNavigate } from "react-router-dom";

type Props = {
  item: RouteType;
};

const SidebarItem = (props: Props) => {
  const { Icon, displayText, path } = props.item;
  const pathUrl = window.location.pathname;

  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate(path ?? "")}
        className={`sidebar-item hover:rounded-sm p-3 cursor-pointer rounded-sm flex items-center gap-x-2 mb-1`}
        style={{
          background: path === pathUrl ? "#fdba74" : "",
          color: `${colors.text.sidebar}`,
        }}
      >
        {<Icon color={path === pathUrl ? "white" : ""} />}
        <p className="title-sidebar" style={{ color: path === pathUrl ? "white" : "" }}>
          {displayText}
        </p>
      </div>
    </>
  );
};

export default SidebarItem;
