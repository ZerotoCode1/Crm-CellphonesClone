import { WS_CODE } from "@/constants/apiUrl";
import { getBase64 } from "@/helpers/function";
import { requestBaseApi } from "@/helpers/common";
import uploadService from "@/services/upload/upload.service";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
interface props {
  setFileList: any;
  fileList: any;
  name: string;
}

const UploadImage = (props: props) => {
  const { setFileList, name, fileList, ...propsNews } = props;
  const [loading, setLoading] = useState(false);

  const handleUploadImage = async (base64Url: string, nameUrl: string) => {
    setLoading(true);
    try {
      const body = {
        ...requestBaseApi({ wsCode: WS_CODE.UPLOADIMAGE }),
        wsRequest: {
          fileData: base64Url.replace(/^data:image\/[a-z]+;base64,/, ""),
          fileName: nameUrl,
        },
      };
      const res = await uploadService.UploadImage(body);
      if (res?.data.errorCode === "S200") {
        setFileList([{ url: res?.data?.result.wsResponse.url }]);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const customRequest = async ({
    file,
    onSuccess,
    onError,
  }: {
    file: RcFile;
    onSuccess: () => void;
    onError: (error: Error) => void;
    name: string;
  }) => {
    try {
      await getBase64(file, (url: string) => {
        handleUploadImage(url, file.name);
      });

      onSuccess();
    } catch (error: any) {
      onError(error);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn cần upload đúng file JPG/PNG !");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("Ảnh không vượt quá 5MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none", width: "100%" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const handleChange = (_info: any) => {
    if (!loading) {
      // setFileList(info.fileList);
    }
  };

  return (
    <Upload
      customRequest={(props: any) => customRequest({ ...props })}
      listType="picture-card"
      fileList={fileList}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      style={{ width: "100%" }}
      onRemove={() => {
        setFileList([]);
      }}
      {...propsNews}
    >
      {fileList.length === 1 ? null : uploadButton}
    </Upload>
  );
};
export default UploadImage;
