import { Form, Table, TableColumnsType } from "antd";
import PaymentService from "@/services/Payments/payment.service";
import { useEffect, useState } from "react";
import { CommonComponent } from "@/components/common-component";
import { DataType } from "@/components/common-component/EditTableCell";

interface Props {
  id: string;
}

const DetailOrderEsim = (props: Props) => {
  const { id } = props;
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    const res = await PaymentService.getbyId({ _id: id });
    if (res?.data?.data[0]) {
      setData(res?.data?.data[0]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      amount: data?.amount,
      nameCusstormer: data?.nameCusstormer,
      method: data?.method,
      status: data?.status,
    });
  }, [data]);
  console.log(data, "ỉuewr");
  const columns: TableColumnsType<DataType> = [
    {
      title: "Màu sắc",
      dataIndex: "keyColor",
      key: "keyColor",
      align: "center",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "img",
      key: "img",
      align: "center",
      render: (src: string) => (
        <div className="text-center">
          <img src={src} className="w-20 h-20 mx-auto" />
        </div>
      ),
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "salePrice",
      key: "salePrice",
      align: "center",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (text: string) => <a>{text}</a>,
    },
  ];
  console.log(data?.item, "ửewrew");
  return (
    <div>
      <h2 className="title-page mb-5 ">Thông tin đơn hàng</h2>
      <Form form={form}>
        <div className="grid grid-cols-4 gap-x-4">
          <Form.Item name="amount">
            <CommonComponent.Input title={"Giá đơn hàng"} placeholder="" required disabled />
          </Form.Item>
          <Form.Item name="nameCusstormer">
            <CommonComponent.Input title={"Tên khách hàng"} placeholder="Nhập tên sản phẩm" required disabled />
          </Form.Item>
          <Form.Item name="method">
            <CommonComponent.Input title={"Phương thức thanh toán"} placeholder="Phương thức thanh toán" required disabled />
          </Form.Item>
          <Form.Item name="status">
            <CommonComponent.Input title={"Trạng thái đơn hàng"} placeholder="Trạng thái" required />
          </Form.Item>
        </div>
      </Form>
      <Table columns={columns} dataSource={data?.item} />;
    </div>
  );
};

export default DetailOrderEsim;
