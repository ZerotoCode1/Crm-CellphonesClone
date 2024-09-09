import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import OrderEsimsServices, { InfoDetailOrderEsim } from "@/services/esim/listOrderEsim.service";
import { useEffect, useState } from "react";

const useGetDetailOrderEsim = (id: string) => {
  const [dataDetail, setData] = useState<InfoDetailOrderEsim>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const body = {
      _id:id
      };
      const res = await OrderEsimsServices.getDetail(body);
      setData(res.data.result.wsResponse);
    } catch {}
  };

  return {
    dataDetail,
  };
};

export default useGetDetailOrderEsim;
