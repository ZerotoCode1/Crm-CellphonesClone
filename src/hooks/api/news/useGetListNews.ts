import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import newsService, { DataListNews, RequestListNews } from "@/services/news/news.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListNews = (filters: RequestListNews, refetchKey: string) => {
  const [data, setData] = useState<DataListNews>();
  const [loading, setLoading] = useState<boolean>(false);
  const save = useSave();

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.NEWS }),
      wsRequest: {
        ...filters,
      },
    };
    setLoading(true);
    try {
      const res = await newsService.getAll(body);

      setData(res.data.result.wsResponse);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [filters]);

  useEffect(() => {
    save(refetchKey, fetch);
  }, [save, refetchKey, fetch]);

  return { data, loading };
};
export default useGetListNews;
