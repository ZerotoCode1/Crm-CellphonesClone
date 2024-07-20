import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import ContactServices, { DataListContact, RequestListContact } from "@/services/contact/contact.service";
import { useSave } from "@/stores/useStores";
import { useEffect, useState } from "react";

const useGetListContact = (filters: RequestListContact, refetchKey: string) => {
  const [data, setData] = useState<DataListContact>();

  const save = useSave();

  const fetch = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.LIST_CONTACT }),
      wsRequest: {
        ...filters,
      },
    };
    try {
      const res = await ContactServices.getAll(body);
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
export default useGetListContact;
