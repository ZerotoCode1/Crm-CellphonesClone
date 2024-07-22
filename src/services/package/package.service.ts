import { PaginationParams, RequestCommon, ResponseCommon } from "@/interfaces/common";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";
import { apiUrl } from "@/constants/apiUrl";
import queryString from "query-string";

export interface RequestListPackage extends PaginationParams {}

export interface RequestDetailPackage {
  packageId: string;
}

export interface RequestImportPackage {
  file: string;
}

export interface RequestUpdatePackage {
  isHidden: boolean;
  isSeller: boolean;
  packageId: string;
  pricePromotion: string | number;
  packageName: string;
}

export interface DataListPackage {
  packages: PackageInfo[];
  total: number;
}

export interface PackageInfo {
  currency: "USD";
  data: string;
  isHidden: boolean;
  isSeller: boolean;
  netPrice: number;
  packageId: string;
  packageName: string;
  packageType: string;
  price: number;
  pricePromotion: number;
  title: string;
  day: number;
  iccid: number;
  isKycVerify: boolean;
  isVja: boolean;
  operator: string;
  packageIdVja: number;
  priceVJA: number;
  slug: string;
  sms: number;
  voice: number;
  activationPolicy: string;
  amount: number;
  countryCode: string;
  coverageRange: { title: string };
}

export interface DetailPackageInfo extends PackageInfo {}

export interface DetailEsimInfo {}

export type ResponseGetAllPackage = AxiosResponse<ResponseCommon<DataListPackage>>;

export type ResponseDetailPackageInfo = AxiosResponse<ResponseCommon<{ package: DetailPackageInfo }>>;
export type ResponseSyncPackage = AxiosResponse<ResponseCommon<{}>>;
export type ResponseExportPackage = AxiosResponse<ResponseCommon<{ file: string }>>;
export type ResponseImportPackage = AxiosResponse<ResponseCommon<{ file: string }>>;

export interface RequestListCategory {
  limit: number;
}
export interface RequestCreateCategory {
  name: string;
  image: File;
  description: string;
}
export interface ResponListCategory {
  _id: string;
  name: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseCategory<> {
  total: number;
  data: ResponListCategory[];
}
export type Respon = AxiosResponse<ResponseCategory>;
export interface RequestDelete {
  _id: string;
  imageName: string;
}
class CategoryServices {
  getAllCategory(body: RequestListCategory): Promise<Respon> {
    return httpServices.get(`${apiUrl.LISTCATEGORY}?${queryString.stringify(body)}`);
  }
  createCategory(body: RequestCreateCategory): Promise<any> {
    return httpServices.post(apiUrl.LISTCATEGORY, body);
  }
  deleteCategory(body: RequestDelete): Promise<any> {
    return httpServices.delete(`${apiUrl.CATEGORYID}?${queryString.stringify(body)}`);
  }
  // sync(body: RequestCommon<{}>): Promise<ResponseSyncPackage> {
  //   return httpServices.post(``, body);
  // }
  // export(body: RequestCommon<{}>): Promise<ResponseExportPackage> {
  //   return httpServices.post(``, body);
  // }
  // import(body: RequestCommon<RequestImportPackage>): Promise<ResponseSyncPackage> {
  //   return httpServices.post(``, body);
  // }
  // update(body: RequestCommon<RequestUpdatePackage>): Promise<ResponseSyncPackage> {
  //   return httpServices.post(``, body);
  // }
}

export default new CategoryServices();
