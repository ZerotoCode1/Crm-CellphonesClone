import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import PackageServices, { DetailPackageInfo } from "@/services/package/package.service";
import { useEffect, useState } from "react";

const useGetDetailPackageInfo = (id: string) => {
  const [dataDetail, setData] = useState<DetailPackageInfo>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const body = {
        ...requestBaseApi({ wsCode: WS_CODE.DETAIL_PACKAGE }),
        wsRequest: {
          packageId: id,
        },
      };
      const res = await PackageServices.getDetail(body);
      setData(res.data.result.wsResponse.package);
    } catch {}
  };

  return {
    dataDetail,
  };
};

export default useGetDetailPackageInfo;
