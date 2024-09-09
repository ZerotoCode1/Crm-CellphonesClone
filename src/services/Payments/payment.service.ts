import { apiUrl } from "@/constants/apiUrl";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import httpServices from "../httpServices";

export interface RequestListProduct {
  limit: number;
}
export interface ResquesPaymentbyId {
  _id: string;
}
export interface ResquesDeleteProduct {
  _id: string;
  imageName: [string];
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
  category_id: FormData;
}
export interface ResponCreate {
  data: ProductItem;
  status: string;
}
export type Response = AxiosResponse<ResponListProduct>;
export type ResponseDetail = AxiosResponse<ProductItem>;
export type ResponseCreateProdcut = AxiosResponse<ResponCreate>;

class PaymentServices {
  getAll(body: RequestListProduct): Promise<Response> {
    return httpServices.get(`${apiUrl.GETPAYMENT}?${queryString.stringify(body)}`);
  }
   getbyId(body: ResquesPaymentbyId): Promise<any> {
    return httpServices.get(`${apiUrl.GETPAYMENT}?${queryString.stringify(body)}`);
  }
}

export default new PaymentServices();
