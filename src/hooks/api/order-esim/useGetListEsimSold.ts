import OrderEsimsServices, { DataListOrderEsim, RequestListProduct } from "@/services/esim/listOrderEsim.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListEsimSold = (filters: RequestListProduct, refetchKey: string) => {
  const [data, setData] = useState<DataListOrderEsim>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...filters,
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
