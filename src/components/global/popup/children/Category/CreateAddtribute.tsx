import { CommonComponent } from "@/components/common-component";
import { DataType } from "@/components/common-component/EditTableCell";
import httpServices from "@/services/httpServices";
import CategoryServices from "@/services/package/package.service";
import { Button } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CreateAddtributeProps {
  categoryId: string;
}
enum Type {
  create = "create",
  edit = "edit",
}
const CreateAddtribute = (prop: CreateAddtributeProps) => {
  const { categoryId } = prop;
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [optionParameter, setOptionParameter] = useState<any>([]);
  const [type, setType] = useState<string>(Type.create);
  const getAddtribute = async () => {
    try {
      const res = await CategoryServices.getAddtribute({ categoryId });
      if (res?.data?.numberTechnical) {
        if (isEmpty(res.data?.numberTechnical)) {
          setDataSource(res.data?.numberTechnical);
          setType(Type.edit);
        }
      }
    } catch (error) {}
  };
  const getsParameter = async () => {
    try {
      const res = await httpServices.get(`/parameter?categoryId=${categoryId}`);
      console.log(res.data, "fsdfds");
      if (res && res?.data) {
        const data = res.data.map((item: any) => {
          return {
            value: item?.nameParameter,
          };
        });
        setOptionParameter(data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAddtribute();
    getsParameter();
  }, []);
  const handleAdd = async () => {
    if (dataSource.length > 0) {
      try {
        const addtribute = JSON.stringify(dataSource);
        const res = await CategoryServices.createAddtribute({ categoryId, numberTechnical: addtribute });
        if (res && res?.data) {
          toast.success("Tạo thông số kỹ thuật thành công");
        }
      } catch (error) {}
    } else {
      toast.error("Vui lòng nhập thông số kỹ thuật");
    }
  };
  const handleEdit = async () => {};
  return (
    <div className="w-[100%] relative">
      <Button onClick={type === Type.create ? handleAdd : handleEdit} type="primary" className="mb-4 h-[45px] right-0 absolute">
        {type === Type.create ? "Tạo thông số kỹ thuật" : "Cập nhật thông số kỹ thuật"}
      </Button>
      <div className="mt-5">
        <CommonComponent.EditTableCell dataSource={dataSource} setDataSource={setDataSource} parameter={optionParameter} />
      </div>
    </div>
  );
};

export default CreateAddtribute;
