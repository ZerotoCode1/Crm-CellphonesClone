import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import ExchangeRateServices, { DataListExchangeRate, RequestListExchangeRate } from "@/services/exchange-rate/exchangeRate.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListExchangeRate = (filters: RequestListExchangeRate, refetchKey: string) => {
  const [data, setData] = useState<DataListExchangeRate>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.List_Exchange_Rate }),
      wsRequest: {
        ...filters,
      },
    };
    try {
      const res = await ExchangeRateServices.getAll(body);
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
export default useGetListExchangeRate;
