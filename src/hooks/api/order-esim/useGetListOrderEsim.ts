import PaymentService from "@/services/Payments/payment.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListProduct = (filters: any, refetchKey: string) => {
  const [data, setData] = useState<any>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...filters,
    };
    try {
      const res = await PaymentService.getAll(body)
      setData(res.data);
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    fetch();
  }, [filters]);

  useEffect(() => {
    save(refetchKey, data);
  }, [save, refetchKey, fetch]);

  return { data };
};
export default useGetListProduct;
