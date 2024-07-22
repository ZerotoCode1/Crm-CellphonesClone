import { CommonComponent } from "@/components/common-component";
import LoadingPageService from "@/services/loadingPage";
import PopupService from "@/services/popupPage";
import { Button, Form, Upload } from "antd";
import CategoryServices, { RequestCreateCategory } from "@/services/package/package.service";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useGet } from "@/stores/useStores";
import { toast } from "react-toastify";

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
  const [fileList, setFileList] = useState<any>([]);
  const refetch = useGet("ListCategory");

  const onFinish = async (value: RequestCreateCategory) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("description", value.description);
    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }
    try {
      LoadingPageService.instance.current.open();
      //@ts-ignore
      const res = await CategoryServices.createCategory(formData);
      toast.success("Tạo danh mục thành công!");
      refetch();
    } catch {
      toast.error("Tạo danh mục thất bại!");
    } finally {
      PopupService.instance.current.close();
      LoadingPageService.instance.current.close();
    }
  };
  const onUploadChange = ({ fileList }: { fileList: any }) => {
    setFileList(fileList);
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
          name={"image"}
          rules={[
            {
              required: true,
              message: "Vui lòng tải ảnh lên!",
            },
          ]}
        >
          <Upload
            fileList={fileList}
            onChange={onUploadChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
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
