import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import ContactServices, { DetailContactInfo } from "@/services/contact/contact.service";
import { useEffect, useState } from "react";

const useGetDetailContactInfo = (id: number) => {
  const [dataDetail, setData] = useState<DetailContactInfo>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const body = {
        ...requestBaseApi({ wsCode: WS_CODE.DETAIL_CONTACT }),
        wsRequest: {
          contactId: id,
        },
      };
      const res = await ContactServices.getDetail(body);
      setData(res.data.result.wsResponse);
    } catch {}
  };

  return {
    dataDetail,
  };
};

export default useGetDetailContactInfo;
