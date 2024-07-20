import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import ControlServices, { DataListControl, RequestListControl } from "@/services/control/control.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListControl = (filters: RequestListControl, refetchKey: string) => {
  const [data, setData] = useState<DataListControl>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.GPAY_LOG }),
      wsRequest: {
        ...filters,
      },
    };
    try {
      const res = await ControlServices.getAll(body);
      setData(res.data.result.wsResponse);
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    fetch();
  }, [filters]);

  useEffect(() => {
    save(refetchKey, fetch);
  }, [save, refetchKey, fetch]);

  return { data };
};
export default useGetListControl;
