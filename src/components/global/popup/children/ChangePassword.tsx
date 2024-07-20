import { CommonComponent } from "@/components/common-component";
import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import { Form } from "antd";
import AccountServices from "@/services/account/account.service";
import { PERMISSION_ENUM, STATUS_API } from "@/interfaces/enum";
import { toast } from "react-toastify";
import PopupService from "@/services/popupPage";
import LoadingPageService from "@/services/loadingPage";

type Password = {
  newPass: string;
  passRetype: string;
};

interface Props {
  accountInfo: FieldType;
}

type FieldType = {
  username: string;
  phone: string;
  email: string;
  roleId: PERMISSION_ENUM;
  statusUser: number;
  userId: number;
};

const ChangePassword = (props: Props) => {
  const { accountInfo } = props;
  const [form] = Form.useForm();

  const onFinish = async (values: Password) => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.UPDATE_PASSWORD }),
      wsRequest: {
        ...values,
        userId: accountInfo.userId,
      },
    };
    LoadingPageService.instance.current.open();
    try {
      const res = await AccountServices.updatePassword(body);
      if (res.data.result.errorCode === STATUS_API.SUCCESS) {
        toast.success("Cập nhập tài khoản thành công");
        PopupService.instance.current.close();
      } else {
        toast.error(res.data.result.message);
      }
    } catch {
    } finally {
      LoadingPageService.instance.current.close();
    }
  };

  const onCancel = () => {
    PopupService.instance.current.close();
  };

  return (
    <div className="mt-5">
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name={"newPass"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập dữ liệu!",
            },
          ]}
        >
          <CommonComponent.InputPassword title={"Mật khẩu mới"} placeholder="Mật khẩu mới" type={"password"} />
        </Form.Item>
        <Form.Item
          name={"passRetype"}
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu mới!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập dữ liệu!",
            },
          ]}
        >
          <CommonComponent.InputPassword title={"Nhập lại mật khẩu mới"} placeholder={"Nhập lại mật khẩu mới"} />
        </Form.Item>
        <div className="flex justify-center gap-x-2">
          <CommonComponent.Button onClick={onCancel} style={{ padding: "12px 30px" }}>
            Huỷ
          </CommonComponent.Button>
          <CommonComponent.Button htmlType="submit" type={"primary"} style={{ padding: "12px 40px" }}>
            Lưu
          </CommonComponent.Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
