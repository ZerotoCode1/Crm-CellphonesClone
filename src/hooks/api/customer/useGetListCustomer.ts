import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import CustomerServices, { DataListCustomer, RequestListCustomer } from "@/services/customer/customer.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListCustomer = (filters: RequestListCustomer, refetchKey: string) => {
  const [data, setData] = useState<DataListCustomer>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.LIST_CUSTOMER }),
      wsRequest: {
        ...filters,
      },
    };
    try {
      const res = await CustomerServices.getAll(body);
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
export default useGetListCustomer;
