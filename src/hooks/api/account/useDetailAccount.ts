import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import AccountServices, { DetailAccountInfo } from "@/services/account/account.service";
import { useEffect, useState } from "react";

const useGetDetailAccount = (userId: number) => {
  const [dataDetail, setData] = useState<DetailAccountInfo>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const body = {
        ...requestBaseApi({ wsCode: WS_CODE.DETAIL_ACCOUNT }),
        wsRequest: {
          userId: userId,
        },
      };
      const res = await AccountServices.getDetail(body);
      setData(res.data.result.wsResponse);
    } catch {}
  };

  return {
    dataDetail,
  };
};

export default useGetDetailAccount;
