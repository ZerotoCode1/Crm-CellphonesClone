import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import { PaginationParams, RequestCommon, ResponseCommon } from "@/interfaces/common";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

export interface RequestDeviceManagement extends PaginationParams {}
export interface Device {
  id: number;
  brand: string;
  name: string;
  os: string;
}

export interface DeviceManagement {
  name: string;
  devices: Device[];
}
export interface ResponseDeviceManagementMain {
  brand: DeviceManagement[];
  total: number;
}
export type ResponseManagementService = AxiosResponse<ResponseCommon<ResponseDeviceManagementMain>>;
export type ResponseSynchronized = AxiosResponse<ResponseCommon<null>>;
class deviceManagementService {
  getAll(body: RequestCommon<RequestDeviceManagement>): Promise<ResponseManagementService> {
    return httpServices.post(``, body);
  }
  synchronized(): Promise<ResponseManagementService> {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.SYNCHRONIZED }),
      wsRequest: {},
    };
    return httpServices.post(``, body);
  }
}

export default new deviceManagementService();
