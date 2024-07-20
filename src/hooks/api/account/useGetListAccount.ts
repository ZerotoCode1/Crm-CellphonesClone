import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import AccountServices, { DataListAccount, RequestListAccount } from "@/services/account/account.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListAccount = (filters: RequestListAccount, refetchKey: string) => {
  const [data, setData] = useState<DataListAccount>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.LIST_ACCOUNT }),
      wsRequest: {
        ...filters,
      },
    };
    try {
      const res = await AccountServices.getAll(body);
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
export default useGetListAccount;
