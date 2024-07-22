import { apiUrl } from "@/constants/apiUrl";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import httpServices from "../httpServices";

export interface RequestListProduct {
  limit: number;
}
export interface ResponProductItem {
  _id: string;
}

export interface ResponListProduct {
  totalCount: number;
  data: ProductItem[];
}
export interface ProductItem {
  _id: string;
  productName: string;
  image: string;
  price: number;
}

export type Response = AxiosResponse<ResponListProduct>;
export type ResponseDetail = AxiosResponse<ProductItem>;

class ProductServices {
  getAll(body: RequestListProduct): Promise<Response> {
    return httpServices.get(`${apiUrl.PRODUCT}?${queryString.stringify(body)}`);
  }
  getById(param: ResponProductItem): Promise<AxiosResponse<ProductItem>> {
    return httpServices.get(`${apiUrl.PRODUCTBYID}?${queryString.stringify(param)}`);
  }
}

export default new ProductServices();
