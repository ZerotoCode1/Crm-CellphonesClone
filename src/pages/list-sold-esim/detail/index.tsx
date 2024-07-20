import { CommonComponent } from "@/components/common-component";
import useGetDetailEsimSold from "@/hooks/api/order-esim/useDetailEsimSold";
import { Form } from "antd";
import queryString from "query-string";
import { dateMoment, typeDate } from "../../../helpers/date";
import Label from "@/components/common-component/form/label";

interface Props {
  id: string;
}

const DetailOrderEsimSold = (_props: Props) => {
  const pathParams = queryString.parse(location.search);
  const id = pathParams?.id as string;
  const { dataDetail: dataDetailOrder } = useGetDetailEsimSold(id);

  const [form] = Form.useForm();

  return (
    <div>
      <Form form={form}>
        <div className="grid grid-cols-4 gap-x-2">
          <div className="">
            <CommonComponent.Input title={"Mã iccid"} value={dataDetailOrder?.iccid} allowClear={false} readOnly />
          </div>
          <div className="">
            <CommonComponent.Input title={"Mã qrcode"} value={dataDetailOrder?.qrcode} allowClear={false} readOnly />
          </div>
          <div className="">
            <CommonComponent.Input title={"Lpa"} value={dataDetailOrder?.lpa} allowClear={false} readOnly />
          </div>
          <div className="">
            <CommonComponent.Input title={"Dữ liệu tổng"} value={dataDetailOrder?.dataUsage.total} allowClear={false} readOnly />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-x-2 mt-5">
          <div className="">
            <CommonComponent.Input title={"Dữ liệu còn lại"} value={dataDetailOrder?.dataUsage.remaining} allowClear={false} readOnly />
          </div>
          <div className="">
            <CommonComponent.Input
              title={"Thời gian hết hạn"}
              value={dateMoment.convertDate(dataDetailOrder?.lastUpdateDataUsage ?? "", typeDate.yyyymmhhmmss, typeDate.ddmmyyyyhhmmss)}
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
        </div>
      </Form>
    </div>
  );
};

export default DetailOrderEsimSold;
