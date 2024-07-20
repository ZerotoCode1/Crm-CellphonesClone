import { WS_CODE } from "@/constants/apiUrl";
import { getBase64UploadCk } from "@/helpers/function";
import { requestBaseApi } from "@/helpers/common";
import uploadService from "@/services/upload/upload.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FormInstance } from "antd";
interface props {
  content: string;
  setContent: any;
  name: string;
  form: FormInstance;
}
const CKEditor5 = (props: props) => {
  const { content, setContent, form, name } = props;
  const uploadFile = (loader: any) => {
    return new Promise((resolve, reject) => {
      loader.file
        .then((file: any) => {
          return getBase64UploadCk(file).then((base64Url: any) => {
            const body = {
              ...requestBaseApi({ wsCode: WS_CODE.UPLOADIMAGE }),
              wsRequest: {
                fileData: base64Url.replace(/^data:image\/[a-z]+;base64,/, ""),
                fileName: file.name,
              },
            };
            return uploadService.UploadImage(body);
          });
        })
        .then((success: any) => {
          if (success?.data?.result.wsResponse.url) {
            resolve({ default: success.data?.result.wsResponse.url });
          } else {
            reject(new Error("Upload successful, but URL is missing"));
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  function CustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
      return {
        upload: () => {
          return uploadFile(loader);
        },
      };
    };
  }
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        extraPlugins: [CustomUploadAdapterPlugin],
      }}
      data={content}
      onChange={(_event: any, editor: any) => {
        const data = editor.getData();
        setContent(data);
        form.setFieldValue(name, data);
      }}
    />
  );
};
export default CKEditor5;
