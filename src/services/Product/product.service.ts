import { apiUrl } from "@/constants/apiUrl";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import httpServices from "../httpServices";

export interface RequestListProduct {
  limit: number;
}
export interface ResquesProductItem {
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

class ProductServices {
  getAll(body: RequestListProduct): Promise<Response> {
    return httpServices.get(`${apiUrl.PRODUCT}?${queryString.stringify(body)}`);
  }
  getById(param: ResquesProductItem): Promise<AxiosResponse<ProductItem>> {
    return httpServices.get(`${apiUrl.PRODUCTBYID}?${queryString.stringify(param)}`);
  }
  createProduct(body: FormData): Promise<AxiosResponse<ResponCreate>> {
    return httpServices.post(apiUrl.PRODUCT, body);
  }
  updateProduct(body: FormData): Promise<AxiosResponse<any>> {
    return httpServices.put(apiUrl.PRODUCTBYID, body);
  }
  deleteProduct(body: ResquesDeleteProduct): Promise<AxiosResponse<{ message: string }>> {
    return httpServices.delete(`${apiUrl.PRODUCTBYID}?${queryString.stringify(body)}`);
  }
}

export default new ProductServices();
