import React from "react";
import { useAuth } from "@/providers/AuthenticationProvider";
import { PERMISSION_ENUM } from "@/interfaces/enum";

const withCheckRole = (
  ComponentWrapped: typeof React.Component | React.LazyExoticComponent<React.MemoExoticComponent<any>> | React.ExoticComponent<any>,
  permission?: (PERMISSION_ENUM | "" | string)[]
) => {
  return () => {
    const { user } = useAuth();
    const role = user.roleId ?? PERMISSION_ENUM.SYSTEMADMIN;
    const havePermission = permission?.includes(role) || permission?.includes(PERMISSION_ENUM.SYSTEMADMIN);

    if (havePermission) {
      return <ComponentWrapped />;
    }

    return <span>{`You're not have permission to access this!`}</span>;
  };
};

export default withCheckRole;
