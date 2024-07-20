import { RequestCommon, ResponseCommon } from "@/interfaces/common";
import { STATUS } from "@/interfaces/enum";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";
import { apiUrl } from "@/constants/apiUrl";
import queryString from "query-string";

export interface RequestListProduct {
  limit: number;
}

export interface RequestDetailOrderEsim {
  orderId: number;
}

export interface RequestDetailOrderEsimSold {
  iccid: string;
}
export interface DataListOrderEsim {
  orders: any;
  total: number;
  orderCRMResList: InfoOrderEsim[];
}

export interface InfoOrderEsim {
  appCode: string;
  countryCode: string;
  createTime: string;
  currency: "AUS";
  currencyAiralo: "USD";
  customerEmail: string;
  customerId: number;
  customerName: string;
  customerPhone: string;
  departureCode: string;
  destinationCode: string;
  expiredAt: string;
  iccid: string;
  id: number;
  netPrice: number;
  orderCode: string;
  orderCodeAiralo: string;
  orderCodeThirdParty: string;
  orderStatus: 1 | 0;
  packageId: string;
  paymentStatus: 1 | 0;
  price: number;
  quantity: number;
  skyjoyMember: string;
  type: any;
}

export interface InfoDetailOrderEsim {
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

export interface InfoDetailOrderEsimSold {
  apnType: "automatic";
  apnValue: any;
  iccid: string;
  isRoaming: boolean;
  lastUpdateDataUsage: string;
  lpa: string;
  qrcode: string;
  qrcodeUrl: string;
  status: "ACTIVE";
  dataUsage: {
    expiredAt: string;
    remaining: number;
    remainingSms: number;
    remainingVoice: number;
    status: "ACTIVE";
    total: number;
    totalText: number;
    totalVoice: number;
    unlimited: boolean;
  };
}

export interface DetailEsimInfo {
  countryCode: string;
  departureCode: string;
  destinationCode: string;
  esimIccid: string;
  id: number;
  orderCodeAiralo: string;
  orderId: number;
  packageId: string;
  packageIdThirdParty: string;
  price: number;
  qrcode: string;
  qrcodeUrl: string;
  quantity: number;
}

export type Response = AxiosResponse<ResponseCommon<DataListOrderEsim>>;
export type ResponseDetailOrderEsim = AxiosResponse<ResponseCommon<InfoDetailOrderEsim>>;
export type ResponseDetailOrderEsimSold = AxiosResponse<ResponseCommon<InfoDetailOrderEsimSold>>;
export type ResponseRetryorderEsimError = AxiosResponse<ResponseCommon<{}>>;

class OrderEsimsServices {
  getAll(body: RequestListProduct): Promise<Response> {
    return httpServices.get(`${apiUrl.PRODUCT}?${queryString.stringify(body)}`);
  }
  // getAllEsimSold(body: RequestCommon<RequestListOrderEsim>): Promise<Response> {
  //   return httpServices.post(``, body);
  // }
  // getDetail(body: RequestCommon<RequestDetailOrderEsim>): Promise<ResponseDetailOrderEsim> {
  //   return httpServices.post(``, body);
  // }
  // getDetailEsimSold(body: RequestCommon<RequestDetailOrderEsimSold>): Promise<ResponseDetailOrderEsimSold> {
  //   return httpServices.post(``, body);
  // }
  // retryOrderEsimError(body: RequestCommon<{ orderIds: number[] }>): Promise<ResponseRetryorderEsimError> {
  //   return httpServices.post(``, body);
  // }
}

export default new OrderEsimsServices();
