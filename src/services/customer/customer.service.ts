import { PaginationParams, RequestCommon, ResponseCommon } from "@/interfaces/common";
import { STATUS } from "@/interfaces/enum";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

export interface RequestListCustomer extends PaginationParams {
  textSearch?: string;
}

export interface RequestDetailCustomer {
  id: number;
}

export interface DataListCustomer {
  customer: CustomerInfo[];
  total: number;
}

export interface CustomerInfo {
  appCode: string;
  currency: "VND";
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  id: number;
  orderCode: string;
  orderCodeThirdParty: string;
  orderStatus: STATUS;
  paymentStatus: STATUS;
  price: number;
  quantity: number;
  skyjoyMember: string;
  details: DetailEsimInfo[];
}

export interface DetailCustomerInfo {
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  id: number;
  skyjoyMember: number;
}

export interface DetailEsimInfo {}

export type ResponseGetAllCustomer = AxiosResponse<ResponseCommon<DataListCustomer>>;

export type ResponseDetailCustomerInfo = AxiosResponse<ResponseCommon<DetailCustomerInfo>>;

class CustomerServices {
  getAll(body: RequestCommon<RequestListCustomer>): Promise<ResponseGetAllCustomer> {
    return httpServices.post(``, body);
  }
  getDetail(body: RequestCommon<RequestDetailCustomer>): Promise<ResponseDetailCustomerInfo> {
    return httpServices.post(``, body);
  }
}

export default new CustomerServices();
