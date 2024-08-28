import { CommonComponent } from "@/components/common-component";
import LoadingPageService from "@/services/loadingPage";
import CategoryServices, { RequestCreateCategory } from "@/services/package/package.service";
import PopupService from "@/services/popupPage";
import { useGet } from "@/stores/useStores";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type FieldType = {
  name?: string;
  image?: string;
  description?: string;
};
interface CategoryProps {
  type: "edit" | "create";
  id?: string;
}
const CreateCategory = (prop: CategoryProps) => {
  const { type, id } = prop;
  const onCancel = () => {
    PopupService.instance.current.close();
  };
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any>([]);
  const refetch = useGet("ListCategory");
  useEffect(() => {
    const fetchData = async () => {
      if (type === "edit") {
        const res = await CategoryServices.getCategoryById({ _id: id ?? "" });
        form.setFieldsValue({
          name: res.data.data[0].name,
          description: res.data.data[0].description,
          _id: res.data.data[0]._id,
        });
      }
    };
    fetchData();
  }, [type]);

  const onFinish = async (value: RequestCreateCategory) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("description", value.description);
    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }
    try {
      LoadingPageService.instance.current.open();
      if (type === "edit") {
        formData.append("_id", id ?? "");
        //@ts-ignore
        const res = await CategoryServices.updateCategory(formData);
        toast.success("Cập nhật danh mục thành công!");
      } else {
        //@ts-ignore
        const res = await CategoryServices.createCategory(formData);
        toast.success("Tạo danh mục thành công!");
      }
      refetch && refetch();
    } catch {
    } finally {
      PopupService.instance.current.close();
      LoadingPageService.instance.current.close();
    }
  };
  const onUploadChange = ({ fileList }: { fileList: any }) => {
    setFileList(fileList);
    console.log(fileList, "fsdfdsfsd");
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
