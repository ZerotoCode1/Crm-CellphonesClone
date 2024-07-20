import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import { PERMISSION_ENUM, STATUS_API } from "@/interfaces/enum";
import { Form } from "antd";
import AccountServices from "@/services/account/account.service";
import { useGet } from "@/stores/useStores";
import { toast } from "react-toastify";
import PopupService from "@/services/popupPage";
import { CommonComponent } from "@/components/common-component";
import Label from "@/components/common-component/form/label";
import useGetListRole from "@/hooks/api/role/usetGetListRole";
import LoadingPageService from "@/services/loadingPage";

interface Props {
  onFirstPage: () => void;
}

type FieldType = {
  username: string;
  phone: string;
  email: string;
  roleId: PERMISSION_ENUM;
  statusUser: number;
  passRetype: string;
};

const CreateAccount = (props: Props) => {
  const { onFirstPage } = props;
  const [form] = Form.useForm();
  const refetch = useGet("listAccount");
  const { dataRole } = useGetListRole();

  const optionsRole = dataRole?.map((item) => {
    return {
      label: item.roleName,
      value: item.roleId,
    };
  });

  const onFinish = async (values: FieldType) => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.CREATE_ACCOUNT }),
      wsRequest: {
        ...values,
      },
    };
    LoadingPageService.instance.current.open();
    try {
      const res = await AccountServices.createAccount(body);
      if (res.data.result.errorCode === STATUS_API.SUCCESS) {
        toast.success("Tạo tài khoản thành công");
        PopupService.instance.current.close();
        onCancel();
        onFirstPage();
        refetch && refetch();
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
        <div className="grid grid-cols-2 gap-x-4">
          <div className="">
            <Form.Item
              normalize={(value) => value.trim()}
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Email !",
                },
                {
                  pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                  message: "Vui lòng nhập Email đúng định dạng!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập dữ liệu!",
                },
              ]}
            >
              <CommonComponent.Input title={"Email"} placeholder="Email" />
            </Form.Item>
          </div>
          <div className="">
            <Form.Item
              normalize={(value) => value.trim()}
              name={"phone"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
                {
                  pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                  message: "Vui lòng nhập số điện thoại đúng định dạng!",
                },
              ]}
            >
              <CommonComponent.Input title={"Số điện thoại"} placeholder="Số điện thoại" />
            </Form.Item>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="">
            <Form.Item
              name={"username"}
              normalize={(value) => value.trim()}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tài khoản!",
                },
              ]}
            >
              <CommonComponent.Input title={"Tài khoản"} placeholder="Tài khoản" />
            </Form.Item>
          </div>
          <div className="">
            <Label title={"Vai trò"} required />
            <Form.Item
              name={"roleId"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng lựa chọn vai trò!",
                },
              ]}
            >
              <CommonComponent.SelectNoForm options={optionsRole ?? []} placeholder={"Vai trò"} />
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <div className="">
            <Form.Item
              normalize={(value) => value.trim()}
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu mới!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập dữ liệu!",
                },
                {
                  min: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự!",
                },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/,
                  message: "Mật khẩu phải bao gồm chữ cái, số và ký tự đặc biệt!",
                },
              ]}
            >
              <CommonComponent.InputPassword title={"Mật khẩu"} placeholder="Mật khẩu" />
            </Form.Item>
          </div>
          <div className="">
            <Form.Item
              normalize={(value) => value.trim()}
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
                {
                  min: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự!",
                },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/,
                  message: "Mật khẩu phải bao gồm chữ cái, số và ký tự đặc biệt!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                  },
                }),
              ]}
            >
              <CommonComponent.InputPassword title={"Xác nhận mật khẩu"} placeholder={"Xác nhận mật khẩu"} />
            </Form.Item>
          </div>
        </div>

        <div className="">
          <Label title={"Trạng thái"} required />
          <Form.Item
            name={"statusUser"}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạng thái của tài khoản!",
              },
            ]}
          >
            <CommonComponent.SelectNoForm options={statusUserOptions ?? []} placeholder={"Trạng thái"} />
          </Form.Item>
        </div>
        <div className="flex justify-center gap-x-2">
          <CommonComponent.Button onClick={onCancel} style={{ padding: "12px 30px" }}>
            Huỷ
          </CommonComponent.Button>
          <CommonComponent.Button htmlType="submit" type={"primary"} style={{ padding: "12px 30px" }}>
            Lưu
          </CommonComponent.Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateAccount;

const statusUserOptions = [
  { label: "Hoạt động", value: 1 },
  { label: "Đã khóa", value: 2 },
];
