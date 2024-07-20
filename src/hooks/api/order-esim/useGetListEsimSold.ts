import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import OrderEsimsServices, { DataListOrderEsim, RequestListOrderEsim } from "@/services/esim/listOrderEsim.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListEsimSold = (filters: RequestListOrderEsim, refetchKey: string) => {
  const [data, setData] = useState<DataListOrderEsim>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.LIST_ESIM_SOLD }),
      wsRequest: {
        ...filters,
      },
    };
    try {
      const res = await OrderEsimsServices.getAll(body);
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
export default useGetListEsimSold;
