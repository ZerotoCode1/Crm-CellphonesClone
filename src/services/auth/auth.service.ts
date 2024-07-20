import { apiUrl, ROOT_URL_LOGIN } from "@/constants/apiUrl";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

interface RequestLogin {
  mail: string;
  password: string;
}

interface ResponseLogin {
  mail: string;
  accessToken: string;
  refreshToken: [];
  message: string;
  status: number;
  role: string;
}

export type Response = AxiosResponse<ResponseLogin>;

class AuthServices {
  login(body: RequestLogin): Promise<Response> {
    return httpServices.post(`${apiUrl.LOGIN}`, body);
  }
}

export default new AuthServices();
