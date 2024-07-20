import { CommonComponent } from "@/components/common-component";
import LoadingPageService from "@/services/loadingPage";
import PopupService from "@/services/popupPage";
import { Form } from "antd";
import CategoryServices, { RequestCreateCategory } from "@/services/package/package.service";

type FieldType = {
  name?: string;
  image?: string;
  description?: string;
};
const CreateCategory = () => {
  const onCancel = () => {
    PopupService.instance.current.close();
  };
  const [form] = Form.useForm();

  const onFinish = async (value: RequestCreateCategory) => {
    const formData = new FormData();

    //    const body = {
    //      ...requestBaseApi({ wsCode: WS_CODE.UPDATE_PASSWORD }),
    //      wsRequest: {
    //        ...values,
    //        userId: accountInfo.userId,
    //      },
    //    };
    //    LoadingPageService.instance.current.open();
    try {
      const res = await CategoryServices.createCategory(value);
    } catch {
    } finally {
      LoadingPageService.instance.current.close();
    }
  };
  return (
    <div className="mt-5">
      <Form form={form} onFinish={onFinish}>
        <Form.Item<FieldType>
          name={"name"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên danh mục!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập dữ liệu!",
            },
          ]}
        >
          <CommonComponent.Input title={"Tên danh mục"} placeholder="Nhập tên danh mục" />
        </Form.Item>
        <Form.Item<FieldType>
          name={"description"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập dữ liệu!",
            },
          ]}
        >
          <CommonComponent.Input title={"Mô tả danh mục"} placeholder={"Nhập mô tả danh mục"} />
        </Form.Item>
        <Form.Item<FieldType>
          name={"description"}
          rules={[
            {
              required: true,
              message: "Vui lòng tải ảnh lên!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập dữ liệu!",
            },
          ]}
        >
          {/* <CommonComponent.UploadImage setFileList={setFileList} fileList={fileList} name="imageVi" /> */}
        </Form.Item>
        <div className="flex justify-center gap-x-2">
          <CommonComponent.Button onClick={onCancel} style={{ padding: "12px 30px" }}>
            Huỷ
          </CommonComponent.Button>
          <CommonComponent.Button htmlType="submit" type={"primary"} style={{ padding: "12px 40px" }}>
            Lưu
          </CommonComponent.Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateCategory;
