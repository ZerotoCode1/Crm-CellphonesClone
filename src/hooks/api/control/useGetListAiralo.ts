import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import ControlServices, { DataListAiralo, RequestListControl } from "@/services/control/control.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListAiralo = (filters: RequestListControl, refetchKey: string) => {
  const [data, setData] = useState<DataListAiralo>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.LIST_AIRALO_LOG }),
      wsRequest: {
        ...filters,
      },
    };
    try {
      const res = await ControlServices.getAllAiralo(body);
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
export default useGetListAiralo;
