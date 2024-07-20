import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import { useEffect, useState } from "react";
import RoleServices, { RoleInfo } from "@/services/role/role.service";

const useGetListRole = () => {
  const [dataRole, setDataRole] = useState<RoleInfo[]>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const body = {
        ...requestBaseApi({ wsCode: WS_CODE.LIST_ROLE }),
      };

      const res = await RoleServices.getAll(body);
      setDataRole(res.data.result.wsResponse.roleResponseList);
    } catch {}
  };

  return {
    dataRole,
  };
};

export default useGetListRole;
