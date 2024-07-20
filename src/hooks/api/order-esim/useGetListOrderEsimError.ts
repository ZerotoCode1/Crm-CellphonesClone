import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import OrderEsimsServices, { DataListOrderEsim, RequestListOrderEsim } from "@/services/esim/listOrderEsim.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListOrderEsimError = (filters: RequestListOrderEsim, refetchKey: string) => {
  const [data, setData] = useState<DataListOrderEsim>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.LIST_ORDER_ESIM_ERROR }),
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
export default useGetListOrderEsimError;
