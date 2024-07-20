import { PaginationParams, RequestCommon, ResponseCommon } from "@/interfaces/common";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

export interface RequestListControl extends PaginationParams {}

export interface RequestDetailControl {
  id: number;
}

export interface DataListControl {
  results: ControlInfo[];
  total: number;
}

export interface DataListAiralo {
  results: DetailAiraloControlInfo[];
  total: number;
}

export interface ControlInfo {
  createdAt: string;
  id: number;
  orderCode: string;
  request: string;
  response: string;
  url: string;
}

export interface DetailGpayControlInfo {
  ControlEmail: string;
  ControlName: string;
  ControlPhone: string;
  id: number;
  skyjoyMember: number;
}

export interface DetailAiraloControlInfo {
  createAt: string;
  function: any;
  iccid: number;
  id: number;
  method: any;
  orderCode: string;
  orderCodeThirdParty: string;
  packageId: string;
  price: number;
  quantity: number;
  request: string;
  response: string;
  status: "fail" | "success";
  url: string;
}

export type ResponseGetAllControl = AxiosResponse<ResponseCommon<DataListControl>>;
export type ResponseAiraloControlInfo = AxiosResponse<ResponseCommon<DataListAiralo>>;
export type ResponseDetailAiraloControlInfo = AxiosResponse<ResponseCommon<DetailAiraloControlInfo>>;

class ControlServices {
  getAll(body: RequestCommon<RequestListControl>): Promise<ResponseGetAllControl> {
    return httpServices.post(``, body);
  }
  getAllAiralo(body: RequestCommon<RequestListControl>): Promise<ResponseAiraloControlInfo> {
    return httpServices.post(``, body);
  }
  getDetailAiralo(body: RequestCommon<RequestDetailControl>): Promise<ResponseDetailAiraloControlInfo> {
    return httpServices.post(``, body);
  }
}

export default new ControlServices();
