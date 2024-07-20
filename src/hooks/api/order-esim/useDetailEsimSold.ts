import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import OrderEsimsServices, { InfoDetailOrderEsimSold } from "@/services/esim/listOrderEsim.service";
import { useEffect, useState } from "react";

const useGetDetailEsimSold = (id: string) => {
  const [dataDetail, setData] = useState<InfoDetailOrderEsimSold>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const body = {
        ...requestBaseApi({ wsCode: WS_CODE.DETAIL_ESIM_SOLD }),
        wsRequest: {
          iccid: `${id}`,
        },
      };
      const res = await OrderEsimsServices.getDetailEsimSold(body);
      setData(res.data.result.wsResponse);
    } catch {}
  };

  return {
    dataDetail,
  };
};

export default useGetDetailEsimSold;
