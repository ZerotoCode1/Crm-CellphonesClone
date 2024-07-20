import { ReactNode } from "react";
import { PERMISSION_ENUM, STATUS } from "./enum";

export interface UserInfos {
  address: string;
  avatar: string;
  createSource: string;
  cusId: number;
  cusName: string;
  dateOfBirth: string;
  email: string;
  idCard: number;
  partnerId: number;
  phone: string;
  roleId: PERMISSION_ENUM;
  token: string;
  session: string;
  sex: STATUS;
  staffId: number;
  statusUser: STATUS;
  typeMethodLogin: number;
  typeUser: number;
  userId: number;
  username: string;
}

export interface RequestCommon<T> {
  sessionId: string;
  token: string;
  wsCode: string;
  wsRequest: T;
}

export interface ResponseCommon<T> {
  errorCode: string;
  errorMessage: string;
  message: string;
  result: {
    errorCode: string;
    message: string;
    wsResponse: T;
  };
}
export interface ResponseCommonGateWay<T> {
  errorCode: string;
  errorMessage: string;
  message: string;
  result: T;
}

export interface Option {
  label: string;
  value: string | number;
}

export type RouteType = {
  element?: ReactNode;
  id: number;
  path?: string;
  children?: ChildrenPathSideBar[];
  displayText: string;
  Icon: ReactNode | any;
  isChild: boolean;
  pathChildren?: string[];
  roles: number[];
};

export interface ChildrenPathSideBar {
  displayText: string;
  path: string;
  roles: number[];
}

export interface IColors {
  color: string;
}

export interface PaginationParams {
  page: string;
  size: string;
}
