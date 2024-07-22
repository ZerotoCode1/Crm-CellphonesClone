import CategoryServices, { RequestListCategory, ResponseCategory } from "@/services/package/package.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetLisCategory = (filters: RequestListCategory, refetchKey: string) => {
  const [data, setData] = useState<ResponseCategory>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...filters,
    };
    try {
      const res = await CategoryServices.getAllCategory(body);
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
export default useGetLisCategory;
