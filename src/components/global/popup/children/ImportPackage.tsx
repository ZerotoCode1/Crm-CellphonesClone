import { CommonComponent } from "@/components/common-component";
import { useState } from "react";
import { iconsSvg } from "../../../icons-svg/index";
import { requestBaseApi } from "@/helpers/common";
import { WS_CODE } from "@/constants/apiUrl";
import LoadingPageService from "@/services/loadingPage";
import { toast } from "react-toastify";
import { STATUS_API } from "@/interfaces/enum";
import { statusMessages } from "@/constants/messages";
import PopupService from "@/services/popupPage";
import PackageServices from "@/services/package/package.service";

const ImportPackage = () => {
  const [fileName, setFileName] = useState<string>("");
  const [base64, setBase64] = useState<string>("");

  const onGetFile = (file: any) => {
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const binaryStr = e.target.result;
        const base64String: any = btoa(binaryStr); // Convert to base64
        setBase64(base64String);
      };
      reader.readAsBinaryString(file);
    }
  };

  const onImportPackage = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.IMPORT_PACKAGE }),
      wsRequest: {
        file: base64,
      },
    };
    try {
      LoadingPageService.instance.current.open();
      const res = await PackageServices.import(body);
      if (res.data.result.errorCode === STATUS_API.SUCCESS) {
        toast.success(statusMessages.importSuccess);
      } else {
        toast.error(res.data.result.message ?? statusMessages.importFail);
      }
    } catch {
    } finally {
      LoadingPageService.instance.current.close();
    }
  };

  const onCancel = () => {
    PopupService.instance.current.close();
  };

  return (
    <div className="mt-5">
      <div className="mb-5">
        <CommonComponent.UploadFile handleFileUpload={onGetFile} />
        <div className="mt-3 flex items-center">
          <p className="mr-2">{fileName}</p>
          {fileName && (
            <iconsSvg.CloseCircle
              onClick={() => {
                setFileName("");
                setBase64("");
              }}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center gap-x-2">
        <CommonComponent.Button onClick={onCancel} style={{ padding: "12px 30px" }}>
          Huỷ
        </CommonComponent.Button>

        <CommonComponent.Button onClick={onImportPackage} type={"primary"} style={{ padding: "12px 30px" }} disabled={!fileName}>
          Lưu
        </CommonComponent.Button>
      </div>
    </div>
  );
};

export default ImportPackage;
