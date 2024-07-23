import { CommonComponent } from "@/components/common-component";
import cachedKeys from "@/constants/cachedKeys";
import useGetLisCategory from "@/hooks/api/Category/useGetListCategory";
import { Form, UploadFile } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import ProductServices from "@/services/Product/product.service";
import { toast } from "react-toastify";
import useFiltersHandler from "@/hooks/useFilters";
import LoadingPageService from "@/services/loadingPage";
import { DataType } from "@/components/common-component/EditTableCell";

const CreateProduct = () => {
  const [option, setOption] = useState<any>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [contentEn, setContentEn] = useState("");

  const [form] = Form.useForm();

  console.log(contentEn, "fsfsdfsdfd");

  const { filters } = useFiltersHandler({});
  const { data } = useGetLisCategory(filters, cachedKeys.ListCategory);
  useEffect(() => {
    if (!isEmpty(data?.data)) {
      const options = data?.data.map((item: any) => {
        return {
          label: item.name,
          value: item._id,
        };
      });
      setOption(options);
    }
  }, [data?.data]);
  const onSubmit = async (values: any) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value as string);
      }
    });
    const listImage = fileList.map((item) => item.originFileObj);
    //@ts-ignore
    formData.append("image[]", ...listImage);
    formData.append("numberTechnical", JSON.stringify(dataSource));
    try {
      LoadingPageService.instance.current.open();
      const res = await ProductServices.createProduct(formData);
      if (res.data.status === "Success") {
        toast.success(`Tạo sản phẩm thành công!`);
      }
    } catch (error) {
      toast.error(`Tạo sản phẩm thất bại!`);
    } finally {
      LoadingPageService.instance.current.close();
    }
  };
  return (
    <div>
      <Form onFinish={onSubmit} form={form}>
        <div className="grid grid-cols-4 gap-x-4">
          <Form.Item name="productName">
            <CommonComponent.Input title={"Tên sản phẩm"} placeholder="Nhập tên sản phẩm" required />
          </Form.Item>
          <Form.Item name="price">
            <CommonComponent.Input title={"Giá"} placeholder="Nhập giá" required />
          </Form.Item>
          <Form.Item name="description">
            <CommonComponent.Input title={"Mô tả"} placeholder="Nhập mô tả" required />
          </Form.Item>
          <Form.Item name="category_id">
            <CommonComponent.Select title="Danh mục" options={option} placeholder="Chọn danh mục" required />
          </Form.Item>
          <Form.Item name="inStore">
            <CommonComponent.Select options={opTionInStore} title={"Trạng thái"} placeholder="Nhập trạng thái" required />
          </Form.Item>
          <Form.Item name="status">
            <CommonComponent.Select options={opTionStatus} title={"Trạng thái"} placeholder="Nhập trạng thái" required />
          </Form.Item>
        </div>
        <Form.Item>
          <CommonComponent.UploadImage fileList={fileList} setFileList={setFileList} />
        </Form.Item>
        <CommonComponent.EditTableCell dataSource={dataSource} setDataSource={setDataSource} />
        <CommonComponent.CKEditor5 form={form} name={"contentEn"} content={contentEn} setContent={setContentEn} />
        <div className="flex justify-center gap-x-2">
          <CommonComponent.Button htmlType="submit" type={"primary"} style={{ padding: "12px 40px" }}>
            Lưu
          </CommonComponent.Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateProduct;

const opTionInStore = [
  {
    label: "Ẩn",
    value: "true",
  },
  {
    label: "Hiện",
    value: "false",
  },
];

const opTionStatus = [
  {
    label: "Đã bán",
    value: "true",
  },
  {
    label: "Chưa bán",
    value: "false",
  },
];
