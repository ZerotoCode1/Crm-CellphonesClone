import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import OrderEsimsServices, { InfoDetailOrderEsim } from "@/services/esim/listOrderEsim.service";
import { useEffect, useState } from "react";

const useGetDetailOrderEsimError = (id: number) => {
  const [dataDetail, setData] = useState<InfoDetailOrderEsim>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const body = {
        ...requestBaseApi({ wsCode: WS_CODE.DETAIL_ORDER_ESIM_ERROR }),
        wsRequest: {
          orderId: id,
        },
      };
      const res = await OrderEsimsServices.getDetail(body);
      setData(res.data.result.wsResponse);
    } catch {}
  };

  return {
    dataDetail,
  };
};

export default useGetDetailOrderEsimError;
