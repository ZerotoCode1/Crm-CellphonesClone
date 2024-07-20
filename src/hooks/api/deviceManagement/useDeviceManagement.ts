import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import { PaginationParams } from "@/interfaces/common";
import deviceManagementService, { ResponseDeviceManagementMain } from "@/services/device-management/deviceManagement.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useDeviceManagement = (filters: PaginationParams, refetchKey: string) => {
  const [data, setData] = useState<ResponseDeviceManagementMain>();
  const [loading, setLoading] = useState<boolean>(false);
  const save = useSave();

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.DEVICES }),
      wsRequest: {
        ...filters,
      },
    };
    setLoading(true);
    try {
      const res = await deviceManagementService.getAll(body);

      setData(res.data.result.wsResponse);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [filters]);

  useEffect(() => {
    save(refetchKey, fetch);
  }, []);

  return { data, loading };
};
export default useDeviceManagement;
