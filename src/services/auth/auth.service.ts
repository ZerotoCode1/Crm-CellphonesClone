import { ROOT_URL_LOGIN } from "@/constants/apiUrl";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

interface RequestLogin {
  username: string;
  password: string;
}

interface ResponseLogin {
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
  roleId: number;
  token: string;
}

export type Response = AxiosResponse<{ errorCode: string; message: string; wsResponse: ResponseLogin }>;

class AuthServices {
  login(body: RequestLogin): Promise<Response> {
    return httpServices.post(`${ROOT_URL_LOGIN}`, body);
  }
}

export default new AuthServices();
