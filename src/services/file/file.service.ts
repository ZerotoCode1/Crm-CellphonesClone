import { RequestCommon, ResponseCommon } from "@/interfaces/common";
import { AxiosResponse } from "axios";
import { RequestListOrderEsim } from "../esim/listOrderEsim.service";
import httpServices from "../httpServices";

interface RequestPreviewOrder {
  fileData: string;
  fileName: string;
}

interface ResponseExportFile {
  file: string;
  fileData: string;
  fileUrl: string;
}

interface DataPreviewOrder {
  result: string;
}
interface DataImportOrder {
  fileUrl: string;
  result: {
    success: any;
    erorr: any;
  };
}

export type Response = AxiosResponse<ResponseCommon<ResponseExportFile>>;
export type ResponsePreviewOrder = AxiosResponse<ResponseCommon<DataPreviewOrder>>;
export type ResponseImportOrder = AxiosResponse<ResponseCommon<DataImportOrder>>;

class FileServices {
  exportOrderEsim(body: RequestCommon<RequestListOrderEsim>): Promise<Response> {
    return httpServices.post(``, body, { timeout: 600000 });
  }
  previewOrder(body: RequestCommon<RequestPreviewOrder>): Promise<ResponsePreviewOrder> {
    return httpServices.post(``, body, { timeout: 600000 });
  }
  importOrder(body: RequestCommon<RequestPreviewOrder>): Promise<ResponseImportOrder> {
    return httpServices.post(``, body, { timeout: 600000 });
  }
}

export default new FileServices();
