import { CommonComponent } from "@/components/common-component";
import { fieldsTable } from "@/constants/fieldsTable";
import { statusMessages } from "@/constants/messages";
import useGetDetailOrderEsim from "@/hooks/api/order-esim/useDetailOrderEsim";
import { Form } from "antd";
import { useEffect } from "react";

interface Props {
  id: number;
}

const DetailOrderEsim = (props: Props) => {
  const { id } = props;
  const { dataDetail: dataDetailOrder } = useGetDetailOrderEsim(id);

  const [form] = Form.useForm();

  useEffect(() => {
    const setFieldValue = () => {
      if (id) {
        const filed = {
          ...dataDetailOrder,
          paymentStatus: dataDetailOrder?.paymentStatus === 1 ? statusMessages.statusPaySuccess : statusMessages.statusPayFail,
          orderStatus: dataDetailOrder?.orderStatus === 1 ? statusMessages.statusOrderSuccess : statusMessages.statusOrderSuccess,
        };
        form.setFieldsValue(filed);
      }
    };
    setFieldValue();
  }, [id, form, dataDetailOrder]);

  return (
    <div>
      <h2 className="title-page mb-5 ">Thông tin đơn hàng</h2>
      <Form form={form}>
        <div className="flex flex-wrap gap-x-2">
          {ordersInfos.map((item, index) => {
            return (
              <div key={index} className="w-[calc(100%/5-8px)]">
                <Form.Item name={item.name}>
                  <CommonComponent.Input title={item.label} readOnly />
                </Form.Item>
              </div>
            );
          })}
        </div>
        <div className="">
          <h2 className="title-page mb-5">Danh sách esim</h2>
          {dataDetailOrder?.details.map((item) => {
            return (
              <div className="flex flex-wrap gap-x-2 mb-8">
                <div className="w-[calc(100%/5-8px)]">
                  <Form.Item>
                    <CommonComponent.Input title={fieldsTable.esimIccid.label} readOnly value={item?.esimIccid} />
                  </Form.Item>
                </div>
                <div className="w-[calc(100%/5-8px)]">
                  <Form.Item>
                    <CommonComponent.Input title={fieldsTable.packageId.label} readOnly value={item?.packageId} />
                  </Form.Item>
                </div>
                <div className="w-[calc(100%/5-8px)]">
                  <Form.Item>
                    <CommonComponent.Input title={fieldsTable.qrcode.label} readOnly value={item?.qrcode} />
                  </Form.Item>
                </div>
                <div className="w-[calc(100%/5-8px)]">
                  <Form.Item>
                    <CommonComponent.Input title={fieldsTable.orderId.label} readOnly value={item?.id} />
                  </Form.Item>
                </div>
                <div className="w-[calc(100%/5-8px)]">
                  <Form.Item>
                    <CommonComponent.Input title={fieldsTable.orderCodeAiralo.label} readOnly value={item?.orderCodeAiralo} />
                  </Form.Item>
                </div>
                <div className="w-[calc(100%/5-8px)]">
                  <img src={item.qrcodeUrl} alt="" />
                </div>
              </div>
            );
          })}
        </div>
      </Form>
    </div>
  );
};

export default DetailOrderEsim;

const ordersInfos = [
  {
    name: "id",
    label: "ID",
  },
  {
    name: fieldsTable.customerName.fieldName,
    label: fieldsTable.customerName.label,
  },
  {
    name: fieldsTable.customerEmail.fieldName,
    label: fieldsTable.customerEmail.label,
  },
  {
    name: fieldsTable.orderCode.fieldName,
    label: fieldsTable.orderCode.label,
  },
  {
    name: fieldsTable.orderCodeVja2.fieldName,
    label: fieldsTable.orderCodeVja2.label,
  },

  {
    name: fieldsTable.price.fieldName,
    label: fieldsTable.price.label,
  },
  {
    name: fieldsTable.currency.fieldName,
    label: fieldsTable.currency.label,
  },
  {
    name: fieldsTable.appCode.fieldName,
    label: fieldsTable.appCode.label,
  },
  {
    name: fieldsTable.quantity.fieldName,
    label: fieldsTable.quantity.label,
  },
  {
    name: fieldsTable.orderStatus.fieldName,
    label: fieldsTable.orderStatus.label,
  },
  {
    name: fieldsTable.paymentStatus.fieldName,
    label: fieldsTable.paymentStatus.label,
  },
];
