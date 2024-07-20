import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import { PaginationParams, RequestCommon, ResponseCommon } from "@/interfaces/common";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

export interface RequestListNews extends PaginationParams {
  title: string;
  appCode: string;
  isHidden: boolean;
  endTime: string;
  popular: number;
  startTime: string;
}

export interface DataListNews {
  result: NewsResponse[];
  total: number;
}
export interface DataListAppCode {
  result: AppCodeResponse[];
}
export interface AppCodeResponse {
  appCode: string;
  id: number;
  name: string;
}
export interface NewsResponse {
  appCode: string;
  appCodes: string[];
  content: string;
  date: string;
  desc: string;
  image: string;
  isHidden: boolean;
  language: string;
  newsId: number;
  popular: number;
  title: string;
  updateTime: string;
}
interface RequestCommonDeleteNews {
  newsId: number;
}
interface NewsItem {
  title: string;
  image: string;
  content: string;
  desc: string;
  language: string;
}

export interface requestCreateNews {
  news: NewsItem[];
  appCode: string[];
  popular: number;
  isHidden: boolean;
  // newsId: number;
}
export interface requestUpdateNews {
  news: NewsItem[];
  appCode: string[];
  popular: number;
  isHidden: boolean;
  newsId: number;
}

export type ResponseGetAllContact = AxiosResponse<ResponseCommon<DataListNews>>;
export type ResponseGetAllAppCode = AxiosResponse<ResponseCommon<DataListAppCode>>;
export type ResponseDelete = AxiosResponse<ResponseCommon<null>>;
export type ResponseNews = AxiosResponse<ResponseCommon<DataListNews>>;
class NewsServices {
  getAll(body: RequestCommon<RequestListNews>): Promise<ResponseGetAllContact> {
    return httpServices.post(``, body);
  }
  getListAppCode(body: RequestCommon<{}>): Promise<ResponseGetAllAppCode> {
    return httpServices.post(``, body);
  }
  deleteNews(body: RequestCommon<RequestCommonDeleteNews>): Promise<ResponseDelete> {
    return httpServices.post(``, body);
  }
  createNews(body: requestCreateNews): Promise<ResponseNews> {
    const bodyAPI = {
      ...requestBaseApi({ wsCode: WS_CODE.CREATENEWS }),
      wsRequest: body,
    };
    return httpServices.post(``, bodyAPI);
  }
  UpdateNews(body: requestUpdateNews): Promise<ResponseNews> {
    const bodyAPI = {
      ...requestBaseApi({ wsCode: WS_CODE.UPDATENEWS }),
      wsRequest: body,
    };
    return httpServices.post(``, bodyAPI);
  }
  getDetailNews(id: number): Promise<ResponseNews> {
    const bodyAPI = {
      ...requestBaseApi({ wsCode: WS_CODE.DETAILNEWS }),
      wsRequest: {
        newsId: String(id),
      },
    };
    return httpServices.post(``, bodyAPI);
  }
}

export default new NewsServices();
