import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import CustomerServices, { DetailCustomerInfo } from "@/services/customer/customer.service";
import { useEffect, useState } from "react";

const useGetDetailCustomerInfo = (id: number) => {
  const [dataDetail, setData] = useState<DetailCustomerInfo>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const body = {
        ...requestBaseApi({ wsCode: WS_CODE.DETAIL_CUSTOMER }),
        wsRequest: {
          id: id,
        },
      };
      const res = await CustomerServices.getDetail(body);
      setData(res.data.result.wsResponse);
    } catch {}
  };

  return {
    dataDetail,
  };
};

export default useGetDetailCustomerInfo;
