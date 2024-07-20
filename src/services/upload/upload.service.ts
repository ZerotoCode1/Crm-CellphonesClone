import { RequestCommon, ResponseCommon } from "@/interfaces/common";
import { AxiosResponse } from "axios";
import httpServices from "../httpServices";

export interface RequestUploadImage {
  fileData: string;
  fileName: string;
}

export interface ResponsiveUploadImage {
  content_type: any;
  fileName: string;
  url: string;
}

export type ResponseUpload = AxiosResponse<ResponseCommon<ResponsiveUploadImage>>;

class UploadService {
  UploadImage(body: RequestCommon<RequestUploadImage>): Promise<ResponseUpload> {
    return httpServices.post(``, body);
  }
}

export default new UploadService();
