import { apiUrl } from "@/constants/apiUrl";
import { ResponseCommon } from "@/interfaces/common";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import httpServices from "../httpServices";

export interface RequestListProduct {
  limit: number;
}

export interface ResponListProduct {
  total: number;
  data: ProductItem[];
}
interface ProductItem {}

export type Response = AxiosResponse<ResponListProduct>;

class ProductServices {
  getAll(body: RequestListProduct): Promise<Response> {
    return httpServices.get(`${apiUrl.PRODUCT}?${queryString.stringify(body)}`);
  }
}

export default new ProductServices();
