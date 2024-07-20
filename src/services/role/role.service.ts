import { RequestCommon, ResponseCommon } from "@/interfaces/common";
import { PERMISSION_ENUM, PERMISSION_NAME } from "@/interfaces/enum";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

export interface RequestListRole {}

export interface DataListRole {
  roleResponseList: RoleInfo[];
}

export interface RoleInfo {
  createTime: string;
  createUser: string;
  roleCode: PERMISSION_NAME;
  roleId: PERMISSION_ENUM;
  roleName: PERMISSION_NAME;
  statusRole: number;
  updateTime: "2022-03-27 16:29:20";
  updateUser: "";
}

export type ResponseGetAllRole = AxiosResponse<ResponseCommon<DataListRole>>;

class RoleServices {
  getAll(body: RequestCommon<RequestListRole>): Promise<ResponseGetAllRole> {
    return httpServices.post(``, body);
  }
}

export default new RoleServices();
