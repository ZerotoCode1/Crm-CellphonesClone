import { PaginationParams, RequestCommon, ResponseCommon } from "@/interfaces/common";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

export interface RequestListExchangeRate extends PaginationParams {}

export interface RequestDetailExchangeRate {
  id: number;
}

export interface RequestCreateExchangeRate {
  currencyTarget: "VND" | string;
  exchangeRate: string;
  languageCode: "vi" | string;
}

export interface DataListExchangeRate {
  result: ExchangeRateInfo[];
  total: number;
}

export interface ExchangeRateInfo {
  createTime: string;
  createUser: string;
  currencyFrom: "USD";
  currencyTarget: "VND";
  endTime: string;
  exchangeRate: number;
  id: number;
  isActive: false;
  languageCode: "vi" | "en";
  startTime: string;
  updateTime: string;
  updateUser: string;
}

export interface DetailExchangeRateInfo extends ExchangeRateInfo {}

export interface DetailEsimInfo {}

export type ResponseGetAllExchangeRate = AxiosResponse<ResponseCommon<DataListExchangeRate>>;

export type ResponseDetailExchangeRateInfo = AxiosResponse<ResponseCommon<DetailExchangeRateInfo>>;

class ExchangeRateServices {
  getAll(body: RequestCommon<RequestListExchangeRate>): Promise<ResponseGetAllExchangeRate> {
    return httpServices.post(``, body);
  }
  getDetail(body: RequestCommon<RequestDetailExchangeRate>): Promise<ResponseDetailExchangeRateInfo> {
    return httpServices.post(``, body);
  }
  create(body: RequestCommon<RequestCreateExchangeRate>): Promise<ResponseDetailExchangeRateInfo> {
    return httpServices.post(``, body);
  }
}

export default new ExchangeRateServices();
