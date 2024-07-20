import ProductServices, { RequestListProduct, ResponListProduct } from "@/services/Product/product.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListProduct = (filters: RequestListProduct, refetchKey: string) => {
  const [data, setData] = useState<ResponListProduct>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...filters,
    };
    try {
      const res = await ProductServices.getAll(body);
      setData(res.data);
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
export default useGetListProduct;
