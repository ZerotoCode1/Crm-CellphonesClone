import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import ControlServices, { DetailAiraloControlInfo } from "@/services/control/control.service";
import { useEffect, useState } from "react";

const useGetDetailAiraloInfo = (id: number) => {
  const [dataDetail, setData] = useState<DetailAiraloControlInfo>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const body = {
        ...requestBaseApi({ wsCode: WS_CODE.DETAIL_AIRALO_LOG }),
        wsRequest: {
          id: id,
        },
      };
      const res = await ControlServices.getDetailAiralo(body);
      setData(res.data.result.wsResponse);
    } catch {}
  };

  return {
    dataDetail,
  };
};

export default useGetDetailAiraloInfo;
