import { PaginationParams, RequestCommon, ResponseCommon } from "@/interfaces/common";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

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

class PackageServices {
  getAll(body: RequestCommon<RequestListPackage>): Promise<ResponseGetAllPackage> {
    return httpServices.post(``, body);
  }
  getDetail(body: RequestCommon<RequestDetailPackage>): Promise<ResponseDetailPackageInfo> {
    return httpServices.post(``, body);
  }
  sync(body: RequestCommon<{}>): Promise<ResponseSyncPackage> {
    return httpServices.post(``, body);
  }
  export(body: RequestCommon<{}>): Promise<ResponseExportPackage> {
    return httpServices.post(``, body);
  }
  import(body: RequestCommon<RequestImportPackage>): Promise<ResponseSyncPackage> {
    return httpServices.post(``, body);
  }
  update(body: RequestCommon<RequestUpdatePackage>): Promise<ResponseSyncPackage> {
    return httpServices.post(``, body);
  }
}

export default new PackageServices();
