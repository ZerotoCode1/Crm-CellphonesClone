import { CommonComponent } from "@/components/common-component";
import { BaseRoute } from "@/constants/baseRoute";
import useGetDetailContactInfo from "@/hooks/api/contact/useDetailContactInfo";

import { Option } from "@/interfaces/common";
import { Form } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ContactServices from "@/services/contact/contact.service";
import { SUCCESS } from "@/constants/common";
interface Props {
  id: number;
  refetch: () => void;
}

const DetailContact = (props: Props) => {
  const { id, refetch } = props;
  const { dataDetail } = useGetDetailContactInfo(id);
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  useEffect(() => {
    if (dataDetail) {
      const { createdAt, updatedAt } = dataDetail;
      form.setFieldsValue({
        ...dataDetail,
        createdAt: moment(createdAt),
        updatedAt: moment(updatedAt ? updatedAt : new Date()),
      });
      setContent(dataDetail.answer || "");
    }
  }, [dataDetail]);

  const onFinish = async (values: any) => {
    const { id, status, staff } = values;
    if (id) {
      const res = await ContactServices.UpdateContact({
        id,
        status,
        answer: content,
        staff,
      });

      if (res.data.result.errorCode === SUCCESS) {
        //  showNotifySuccess("center", "success", "Lưu thành công", false);
        refetch();
        toast.success("Lưu thành công");
      } else {
        //  showErrorAlert(msg);
        toast.success("Lưu thất bại");
      }
    }
  };
  const option: Option[] = [
    {
      value: 1,
      label: "Mới tiếp nhận",
    },
    {
      value: 2,
      label: "Đã phản hồi",
    },
  ];
  const Navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="title-page ">{"Chi tiết liên hệ Skyfi"}</h3>
        <div className="flex gap-5">
          <CommonComponent.Button onClick={() => Navigate(BaseRoute.ContactsSkyfi)}>Quay lại</CommonComponent.Button>
          <CommonComponent.Button onClick={() => form.submit()} type="primary" htmlType="submit">
            Lưu
          </CommonComponent.Button>
        </div>
      </div>
      <div className="p-4 bg-[#fff] rounded ">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-5 ">
            <Form.Item label="ID" name={"id"}>
              <CommonComponent.Input disabled />
            </Form.Item>
            <Form.Item label="Tên khách hàng" name={"customerName"}>
              <CommonComponent.Input disabled />
            </Form.Item>
            <Form.Item label="Email" name={"customerEmail"}>
              <CommonComponent.Input disabled />
            </Form.Item>
            <Form.Item label="Số điện thoại" name={"customerPhone"}>
              <CommonComponent.Input disabled />
            </Form.Item>
            <Form.Item label="Nhân viên hỗ trợ" name={"staff"}>
              <CommonComponent.Input />
            </Form.Item>
            <Form.Item label="Trạng thái" name={"status"}>
              <CommonComponent.Select placeholder="" options={option} />
            </Form.Item>
            <Form.Item label="Thời gian yêu cầu" name={"createdAt"}>
              <CommonComponent.DatePicker disabled />
            </Form.Item>
            <Form.Item label="Thời gian phản hồi" name={"updatedAt"}>
              <CommonComponent.DatePicker disabled />
            </Form.Item>
          </div>
          <Form.Item label="Phản hồi của nhân viên" name="answer">
            <CommonComponent.CKEditor5 form={form} content={content} setContent={setContent} name="answer" />
          </Form.Item>
          <Form.Item label="Chủ đề" name="subject">
            <CommonComponent.Input disabled />
          </Form.Item>
          <Form.Item label="Ý kiến của khách hàng" name={"content"}>
            <CommonComponent.InputTextArea style={{ height: 140 }} disabled />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DetailContact;
