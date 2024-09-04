import { CommonComponent } from "@/components/common-component";
import { DataType } from "@/components/common-component/EditTableCell";
import cachedKeys from "@/constants/cachedKeys";
import useGetLisCategory from "@/hooks/api/Category/useGetListCategory";
import useFiltersHandler from "@/hooks/useFilters";
import httpServices from "@/services/httpServices";
import ProductServices from "@/services/Product/product.service";
import { Form, UploadFile } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateColor, { Color } from "../createProDuct/Children/CreateColor";
import CreateVersion from "../createProDuct/Children/CreateVersion";

export type Version = {
  id: number;
  data: any;
  nameVersion: string;
  priceVersion: string;
  color: string[];
  quannity: [{}];
};
const Editproduct = () => {
  const id = new URLSearchParams(useLocation().search).get("id");
  const [form] = Form.useForm();
  const [option, setOption] = useState<any>([]);
  const [optionParameter, setOptionParameter] = useState<any>([]);
  const [content, setContent] = useState("");
  const [color, setColor] = useState<Color[]>([]);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [version, setVersion] = useState<[{ id: 0; data: any; nameVersion: ""; priceVersion: ""; color: [""]; quannity: [{}] }]>([
    { id: 0, data: dataSource, nameVersion: "", priceVersion: "", color: [""], quannity: [{}] },
  ]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [dataProduct, setDataProduct] = useState<any>({});
  const { filters } = useFiltersHandler({});
  const { data } = useGetLisCategory(filters, cachedKeys.ListCategory);
  const convertData = () => {
    if (!isEmpty(data?.data)) {
      const options = data?.data.map((item: any) => {
        return {
          label: item.name,
          value: item._id,
        };
      });
      setOption(options);
    }
  };
  const getData = async () => {
    try {
      const res = await httpServices.get(`/product?_id=${id}`);
      if (res?.data?.data) {
        const data = res.data?.data?.[0];
        handleChangeCategory(data?.category_id);
        setDataProduct(data);
        setColor(data?.versionColor);
      }
    } catch (error) {}
  };
  useEffect(() => {
    convertData();
  }, [data?.data]);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (dataProduct && dataProduct?.image) {
      setFileList(
        dataProduct?.image?.map((item: any, index: number) => {
          return {
            uid: index,
            name: "image.png",
            status: "done",
            url: item,
          };
        })
      );
    }
    if (dataProduct && dataProduct?.version) {
      setVersion(dataProduct?.version);
    }
    form.setFieldsValue({
      productName: dataProduct?.productName,
      price: dataProduct?.price,
      description: dataProduct?.description,
      category_id: dataProduct?.category_id,
      inStore: dataProduct?.inStore,
      status: String(dataProduct?.status),
      content: dataProduct?.content,
    });
  }, [dataProduct]);

  const handleChangeCategory = async (value: string) => {
    try {
      const res = await httpServices.get(`/parameter?categoryId=${value}`);
      const data = res.data.map((item: any) => {
        return {
          value: item?.nameParameter,
        };
      });
      setOptionParameter(data);
    } catch (error) {}
  };
  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("_id", "66d2f05bfeaa5246112183e8");
    formData.append("category_id", values.category_id);
    formData.append("productName", values.productName);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("inStore", values.inStore);
    formData.append("status", values.status);
    formData.append("content", content);
    fileList.map((item: any) => {
      formData.append("image[]", item.originFileObj);
    });
    formData.append("numberTechnical", JSON.stringify(dataSource));
    formData.append("version", JSON.stringify(version));
    formData.append("versionColor", JSON.stringify(color));
    try {
      const res = await ProductServices.updateProduct(formData);
    } catch (error) {}
  };
  console.log(optionParameter, "rtyurtyrt");
  return (
    <div>
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
              <CommonComponent.Select
                onChange={(e) => handleChangeCategory(e)}
                title="Danh mục"
                options={option}
                placeholder="Chọn danh mục"
                required
              />
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
          <CreateColor color={color} setColor={setColor} setVersion={setVersion} />
          <CreateVersion
            optionColor={color}
            dataDefault={dataProduct?.numberTechnical ?? []}
            dataSources={version}
            setDataSources={setVersion}
            optionParameter={optionParameter}
          />
          <Form.Item name="content">
            <CommonComponent.CkEditorCustom setContent={setContent} content={dataProduct?.content} />
          </Form.Item>
          <div className="flex justify-center gap-x-2">
            <CommonComponent.Button htmlType="submit" type={"primary"} style={{ padding: "12px 40px" }}>
              Lưu
            </CommonComponent.Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Editproduct;
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
