import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import ExchangeRateServices, { DetailExchangeRateInfo } from "@/services/exchange-rate/exchangeRate.service";
import { useEffect, useState } from "react";

const useGetDetailExchangeRateInfo = (id: number) => {
  const [dataDetail, setData] = useState<DetailExchangeRateInfo>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const body = {
        ...requestBaseApi({ wsCode: WS_CODE.DETAIL_EXCHANGE_RATE }),
        wsRequest: {
          id: id,
        },
      };
      const res = await ExchangeRateServices.getDetail(body);
      setData(res.data.result.wsResponse);
    } catch {}
  };

  return {
    dataDetail,
  };
};

export default useGetDetailExchangeRateInfo;
