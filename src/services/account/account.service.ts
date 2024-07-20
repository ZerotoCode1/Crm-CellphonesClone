import { PaginationParams, RequestCommon, ResponseCommon } from "@/interfaces/common";
import { PERMISSION_ENUM, PERMISSION_NAME, STATUS } from "@/interfaces/enum";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

export interface RequestListAccount extends PaginationParams {
  textSearch?: string;
  phone: string;
  statusUser: STATUS;
}

export interface RequestDetailAccount {
  userId: number;
}

export interface RequestUpdateAccount {
  username: string;
  phone: string;
  email: string;
  roleId: PERMISSION_ENUM;
  statusUser: number;
}

export interface RequestUpdatePasswordAccount {
  newPass: string;
  passRetype: string;
  userId: number;
}

export interface RequestCreateAccountAccount extends RequestUpdateAccount {
  passRetype: string;
}

export interface DataListAccount {
  totalItem: number;
  totalPage: number;
  userResponeList: AccountInfo[];
}

export interface AccountInfo {
  avatar: string;
  createSource: null;
  createTime: string;
  createUser: string;
  cusId: number;
  email: string;
  partnerId: number;
  password: string;
  phone: string;
  roleId: PERMISSION_ENUM;
  roleName: PERMISSION_NAME;
  session: string;
  staffId: number;
  statusUser: STATUS;
  token: string;
  typeMethodLogin: any;
  typeUser: any;
  updateTime: string;
  updateUser: any;
  userId: number;
  username: string;
}

export interface DetailAccountInfo extends AccountInfo {}

export interface DataUpdateAccount {}

export type ResponseGetAllAccount = AxiosResponse<ResponseCommon<DataListAccount>>;

export type ResponseDetailAccountInfo = AxiosResponse<ResponseCommon<DetailAccountInfo>>;

export type ResponseUpdateAccount = AxiosResponse<ResponseCommon<{}>>;

export type ResponseUpdatePasswordAccount = AxiosResponse<ResponseCommon<{}>>;

class AccountServices {
  getAll(body: RequestCommon<RequestListAccount>): Promise<ResponseGetAllAccount> {
    return httpServices.post(``, body);
  }
  getDetail(body: RequestCommon<RequestDetailAccount>): Promise<ResponseDetailAccountInfo> {
    return httpServices.post(``, body);
  }
  updateAccount(body: RequestCommon<RequestUpdateAccount>): Promise<ResponseUpdateAccount> {
    return httpServices.post(``, body);
  }
  updatePassword(body: RequestCommon<RequestUpdatePasswordAccount>): Promise<ResponseUpdatePasswordAccount> {
    return httpServices.post(``, body);
  }
  createAccount(body: RequestCommon<RequestCreateAccountAccount>): Promise<ResponseUpdatePasswordAccount> {
    return httpServices.post(``, body);
  }
}

export default new AccountServices();
