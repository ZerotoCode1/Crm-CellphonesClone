import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import { PaginationParams, RequestCommon, ResponseCommon } from "@/interfaces/common";
import { STATUS } from "@/interfaces/enum";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

export interface RequestListContact extends PaginationParams {
  status?: STATUS | "";
}

export interface RequestDetailContact {
  contactId: number;
}

export interface DataListContact {
  contacts: ContactInfo[];
  total: number;
}

export interface ContactInfo {
  answer: string;
  content: string;
  createAt: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  deviceModel: string;
  esimIccid: number;
  id: number;
  staff: string;
  status: STATUS;
  subject: string;
}

export interface DetailContactInfo extends ContactInfo {
  createdAt: string;
  updatedAt: string;
}
export interface requestUpdateContact {
  answer: string;
  id: number;
  staff: string;
  status: number;
}
export interface DetailEsimInfo {}

export type ResponseGetAllContact = AxiosResponse<ResponseCommon<DataListContact>>;

export type ResponseDetailContactInfo = AxiosResponse<ResponseCommon<DetailContactInfo>>;
export type ResponseUpdateDetail = AxiosResponse<ResponseCommon<DetailContactInfo>>;
class ContactServices {
  getAll(body: RequestCommon<RequestListContact>): Promise<ResponseGetAllContact> {
    return httpServices.post(``, body);
  }
  getDetail(body: RequestCommon<RequestDetailContact>): Promise<ResponseDetailContactInfo> {
    return httpServices.post(``, body);
  }
  UpdateContact(body: requestUpdateContact): Promise<ResponseUpdateDetail> {
    const bodyAPI = {
      ...requestBaseApi({ wsCode: WS_CODE.UPDATE_CONTACT }),
      wsRequest: body,
    };
    return httpServices.post(``, bodyAPI);
  }
}

export default new ContactServices();
