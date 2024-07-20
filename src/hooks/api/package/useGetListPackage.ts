import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import PackageServices, { DataListPackage, RequestListPackage } from "@/services/package/package.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetLisPackage = (filters: RequestListPackage, refetchKey: string) => {
  const [data, setData] = useState<DataListPackage>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.LIST_PACKAGE }),
      wsRequest: {
        ...filters,
      },
    };
    try {
      const res = await PackageServices.getAll(body);
      setData(res.data.result.wsResponse);
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    fetch();
  }, [filters]);

  useEffect(() => {
    save(refetchKey, fetch);
  }, [save, refetchKey, fetch]);

  return { data };
};
export default useGetLisPackage;
