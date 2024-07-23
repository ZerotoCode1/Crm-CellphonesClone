import { CommonComponent } from "@/components/common-component";
import useGetDetailProduct from "@/hooks/api/Product/useGetDetailProduct";
import CategoryServices, { ResponListCategory } from "@/services/package/package.service";
import ProductServices from "@/services/Product/product.service";

import { Form, UploadFile } from "antd";
import queryString from "query-string";
import { useEffect, useState } from "react";

interface Props {
  id: string;
}

const DetailProduct = (_props: Props) => {
  const pathParams = queryString.parse(location.search);
  const id = pathParams?.id as string;
  const { dataDetail } = useGetDetailProduct(id);
  const [option, setOption] = useState<any>([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const filters = {};

  useEffect(() => {
    const fetch = async () => {
      const res = await CategoryServices.getAllCategory(filters);
      const options = res.data.data.map((item: ResponListCategory) => {
        return {
          label: item.name,
          value: item._id,
        };
      });
      setOption(options);
    };
    fetch();
  }, []);
  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: dataDetail?.image,
      },
    ]);
  }, [dataDetail?.image]);
  console.log(fileList, "fsfsdsdf");
  const onsubmit = async (values: any) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value as string);
      }
    });
    formData.append("inStore", "true");
    //@ts-ignore
    formData.append("image[]", fileList[0].originFileObj);
    try {
      const res = await ProductServices.createProduct(formData);
    } catch (error) {}
  };
  return (
    <div>
      {dataDetail && (
        <Form form={form} initialValues={dataDetail} onFinish={onsubmit}>
          <div className="grid grid-cols-4 gap-x-2">
            {inputList.map((item, index) => (
              <div key={index} className="">
                <Form.Item name={item.name}>
                  <CommonComponent.Input title={item.label} allowClear={false} />
                </Form.Item>
              </div>
            ))}
            <Form.Item name={"category_id"}>
              <CommonComponent.Select options={option} placeholder="Danh mục sản phẩm" title="Danh mục sản phẩm" />
            </Form.Item>
            <Form.Item name={"image"}>
              <CommonComponent.UploadImage setFileList={setFileList} fileList={fileList} />
            </Form.Item>
          </div>
          <div className="flex justify-center gap-x-2">
            <CommonComponent.Button htmlType="submit" type={"primary"} style={{ padding: "12px 40px" }}>
              Lưu
            </CommonComponent.Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default DetailProduct;
type typeInput = {
  type: "input" | "select" | "date" | "image";
  name: string;
  label: string;
};
const inputList: typeInput[] = [
  {
    type: "input",
    name: "productName",
    label: "Tên sản phẩm",
  },
  {
    type: "input",
    name: "price",
    label: "Giá",
  },
  {
    type: "input",
    name: "description",
    label: "Mô tả",
  },
  {
    type: "input",
    name: "status",
    label: "Trạng thái",
  },
];
