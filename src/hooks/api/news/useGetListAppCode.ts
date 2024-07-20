import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import newsService from "@/services/news/news.service";
import { useEffect, useState } from "react";

const useGetListAppCode = () => {
  const [dataAppCode, setDataAppCode] = useState<any>([]);

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.APPCODE }),
      wsRequest: {},
    };
    try {
      const res = await newsService.getListAppCode(body);
      const data = res.data.result.wsResponse.result.map((item) => {
        return {
          label: item.name,
          value: item.appCode,
        };
      });
      setDataAppCode(data);
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { dataAppCode };
};
export default useGetListAppCode;
