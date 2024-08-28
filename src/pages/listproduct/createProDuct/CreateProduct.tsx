import { CommonComponent } from "@/components/common-component";
import { DataType } from "@/components/common-component/EditTableCell";
import cachedKeys from "@/constants/cachedKeys";
import useGetLisCategory from "@/hooks/api/Category/useGetListCategory";
import useFiltersHandler from "@/hooks/useFilters";
import httpServices from "@/services/httpServices";
import LoadingPageService from "@/services/loadingPage";
import CategoryServices from "@/services/package/package.service";
import ProductServices from "@/services/Product/product.service";
import { Form, UploadFile } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateColor from "./Children/CreateColor";
import CreateVersion from "./Children/CreateVersion";

const CreateProduct = () => {
  const [option, setOption] = useState<any>([]);
  const [categoryId, setCategoryId] = useState("");
  const [optionParameter, setOptionParameter] = useState<any>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [content, setContent] = useState("");
  const [version, setVersion] = useState<[{ id: 0; data: any; nameVersion: ""; priceVersion: ""; color: [""]; quannity: [{}] }]>([
    { id: 0, data: dataSource, nameVersion: "", priceVersion: "", color: [""], quannity: [{}] },
  ]);
  const [image, setImage] = useState<any>({});
  const [versionColor, setVersionColor] = useState<any>([]);
  const [color, setColor] = useState<string[]>([]);
  const [form] = Form.useForm();

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
  const getAddtribute = async () => {
    try {
      const res = await CategoryServices.getAddtribute({ categoryId });
      if (!isEmpty(res?.data?.numberTechnical)) {
        setDataSource(res.data?.numberTechnical);
        //  setType(Type.edit);
      }
    } catch (error) {
      console.log(error, "fsdfsdf");
    }
  };
  useEffect(() => {
    getAddtribute();
  }, [categoryId]);
  useEffect(() => {
    convertData();
  }, [data?.data]);
  const handleChangeCategory = async (value: string) => {
    setCategoryId(value);
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
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value as string);
      }
    });
    //@ts-ignore
    fileList.map((item: any) => {
      formData.append("image[]", item.originFileObj);
    });
    formData.append("numberTechnical", JSON.stringify(dataSource));
    formData.append("version", JSON.stringify(version));
    formData.append("content", content);
    formData.append("versionColor", JSON.stringify(versionColor));
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
  console.log(dataSource, "dataSource");
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
        <CreateColor
          color={color}
          setColor={setColor}
          image={image}
          setImage={setImage}
          versionColor={versionColor}
          setVersionColor={setVersionColor}
        />
        <CreateVersion
          optionColor={color}
          dataDefault={dataSource}
          dataSources={version}
          setDataSources={setVersion}
          optionParameter={optionParameter}
        />
        <CommonComponent.CkEditorCustom setContent={setContent} />
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
