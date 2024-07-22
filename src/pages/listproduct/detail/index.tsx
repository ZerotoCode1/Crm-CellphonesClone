import { CommonComponent } from "@/components/common-component";
import Label from "@/components/common-component/form/label";
import useGetDetailProduct from "@/hooks/api/Product/useGetDetailProduct";
import { Form, Input } from "antd";
import queryString from "query-string";
import { dateMoment, typeDate } from "../../../helpers/date";

interface Props {
  id: string;
}

const DetailProduct = (_props: Props) => {
  const pathParams = queryString.parse(location.search);
  const id = pathParams?.id as string;
  const { dataDetail } = useGetDetailProduct(id);
  const [form] = Form.useForm();
  return (
    <div>
      {dataDetail && (
        <Form form={form} initialValues={dataDetail}>
          <div className="grid grid-cols-4 gap-x-2">
            {inputList.map((item, index) => (
              <div key={index} className="">
                <Form.Item name={item.name}>
                  <CommonComponent.Input title={item.name} allowClear={false} readOnly />
                </Form.Item>
              </div>
            ))}
            {/* <div className="">
              <Form.Item name="_id">
                <CommonComponent.Input title={"Mã iccid"} allowClear={false} />
              </Form.Item>
            </div>
            <div className="">
              <Form.Item name="price">
                <CommonComponent.Input title={"Mã qrcode"} allowClear={false} readOnly />
              </Form.Item>
            </div>
            <div className="">
              <CommonComponent.Input title={"Lpa"} value={dataDetail?.price} allowClear={false} readOnly />
            </div>
            <div className="">
              <CommonComponent.Input title={"Dữ liệu tổng"} value={dataDetail?.productName} allowClear={false} readOnly />
            </div> */}
          </div>
          {/* <div className="grid grid-cols-4 gap-x-2 mt-5">
          <div className="">
            <CommonComponent.Input title={"Dữ liệu còn lại"} value={dataDetail?.dataUsage.remaining} allowClear={false} readOnly />
          </div>
          <div className="">
            <CommonComponent.Input
              title={"Thời gian hết hạn"}
              value={dateMoment.convertDate(dataDetail?.lastUpdateDataUsage ?? "", typeDate.yyyymmhhmmss, typeDate.ddmmyyyyhhmmss)}
              allowClear={false}
              readOnly
            />
          </div>
          <div className="">
            <CommonComponent.Input title={"Tổng cuộc gọi"} value={dataDetailOrder?.dataUsage.totalVoice} allowClear={false} readOnly />
          </div>
          <div className="">
            <CommonComponent.Input title={"Cuộc gọi còn lại"} value={dataDetailOrder?.dataUsage.remainingVoice} allowClear={false} readOnly />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-x-2 mt-5">
          <div className="">
            <CommonComponent.Input title={"Tổng số tin nhắn"} value={dataDetailOrder?.dataUsage.totalText} allowClear={false} readOnly />
          </div>
          <div className="">
            <CommonComponent.Input title={"Tổng tin nhắn còn lại"} value={dataDetailOrder?.dataUsage.remainingSms} allowClear={false} readOnly />
          </div>
          <div className="">
            <CommonComponent.Input
              title={"Lần cuối cập nhật"}
              value={dateMoment.convertDate(dataDetailOrder?.lastUpdateDataUsage ?? "", typeDate.yyyymmdd, typeDate.ddmmyyyy)}
              allowClear={false}
              readOnly
            />
          </div>
          <div className="">
            <CommonComponent.Input
              title={"Trạng thái"}
              value={dataDetailOrder?.status === "ACTIVE" ? "Hoạt động" : "Đã khoá"}
              allowClear={false}
              readOnly
            />
          </div>
        </div>
        <div className="mt-5">
          <Label title={"Mã QR"} />
          <div className="">
            <img src={dataDetailOrder?.qrcodeUrl} alt="" className="w-[25%]" />
          </div>
        </div> */}
        </Form>
      )}
    </div>
  );
};

export default DetailProduct;
type typeInput = {
  type: "input" | "select" | "date" | "image";
  name: string;
};
const inputList: typeInput[] = [
  {
    type: "input",
    name: "_id",
  },
  {
    type: "input",
    name: "productName",
  },
  {
    type: "input",
    name: "price",
  },
  {
    type: "input",
    name: "image",
  },
  {
    type: "input",
    name: "description",
  },
  {
    type: "select",
    name: "category_id",
  },
  {
    type: "input",
    name: "status",
  },
];
