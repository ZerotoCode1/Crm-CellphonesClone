import { ChildrenPathSideBar, RouteType } from "@/interfaces/common";
import { Popover } from "antd/lib";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  appRoutes: RouteType[];
}

const Options = (props: { item: ChildrenPathSideBar[] }) => {
  const { item } = props;
  const navigate = useNavigate();
  return (
    <div className="">
      {item.map((item) => {
        return (
          <div className=" cursor-pointer py-1 hover:text-red-500" onClick={() => navigate(item.path)}>
            {item.displayText}
          </div>
        );
      })}
    </div>
  );
};

const PopoverItem = (props: { item: RouteType }) => {
  const { item } = props;
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="flex justify-center mb-6">
      <Popover
        key={item.id}
        //@ts-ignore
        content={<Options item={item?.children ?? {}} />}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        style={{ padding: "0", width: "fit-content" }}
        placement={"rightTop"}
      >
        <div className="">
          <item.Icon />
        </div>
      </Popover>
    </div>
  );
};

const NavMobile = (props: Props) => {
  const { appRoutes } = props;

  const navigate = useNavigate();

  return (
    <div>
      {appRoutes.map((item) => {
        if (item.isChild) {
          return <PopoverItem item={item} />;
        }
        return (
          <div key={item.id} className="mb-6 flex justify-center" onClick={() => navigate(item?.path ?? "")}>
            <item.Icon />
          </div>
        );
      })}
    </div>
  );
};

export default NavMobile;
