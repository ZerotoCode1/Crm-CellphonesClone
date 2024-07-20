import { CommonComponent } from "@/components/common-component";
import Label from "@/components/common-component/form/label";
import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import useGetDetailAccount from "@/hooks/api/account/useDetailAccount";
import useGetListRole from "@/hooks/api/role/usetGetListRole";
import { PERMISSION_ENUM, STATUS_API } from "@/interfaces/enum";
import AccountServices, { DetailAccountInfo } from "@/services/account/account.service";
import LoadingPageService from "@/services/loadingPage";
import PopupService from "@/services/popupPage";
import { useGet } from "@/stores/useStores";
import { Form } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  accountInfo: Omit<DetailAccountInfo & { roleName: string }, "">;
}

type FieldType = {
  username: string;
  phone: string;
  email: string;
  roleId: PERMISSION_ENUM;
  statusUser: number;
};

const EditAccount = (props: Props) => {
  const [form] = Form.useForm();
  const { accountInfo } = props;
  const { dataDetail } = useGetDetailAccount(accountInfo.userId);
  const { dataRole } = useGetListRole();
  const refetch = useGet("listAccount");

  const optionsRole = dataRole?.map((item) => {
    return {
      label: item.roleName,
      value: item.roleId,
    };
  });

  const onFinish = async (values: FieldType) => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.UPDATE_ACCOUNT }),
      wsRequest: {
        ...values,
      },
    };
    try {
      LoadingPageService.instance.current.open();
      const res = await AccountServices.updateAccount(body);
      if (res.data.result.errorCode === STATUS_API.SUCCESS) {
        toast.success("Cập nhập tài khoản thành công");
        refetch && refetch();
        PopupService.instance.current.close();
      } else {
        toast.error(res.data.result.message);
      }
    } catch {
    } finally {
      LoadingPageService.instance.current.close();
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      email: dataDetail?.email,
      phone: dataDetail?.phone,
      username: dataDetail?.username,
      roleId: dataDetail?.roleId,
      statusUser: dataDetail?.statusUser,
    });
  }, [dataDetail]);

  const onCancel = () => {
    PopupService.instance.current.close();
  };

  return (
    <div className="mt-4">
      <Form form={form} onFinish={onFinish}>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="">
            <Form.Item
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
              <CommonComponent.Input title={"Email"} required />
            </Form.Item>
          </div>
          <div className="">
            <Form.Item
              name={"phone"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
                {
                  pattern: /((09|03|07|08|05|\*)+([0-9\*]{8})\b)/g,
                  message: "Vui lòng nhập số điện thoại đúng định dạng!",
                },
                // {
                //   message: "Vui lòng nhập số điện thoại đúng định dạng!",
                //   validator: (_, value) => {
                //     if (value === accountInfo.phone) {
                //       return Promise.resolve();
                //     } else {
                //       return value.includes("*") ? Promise.reject() : Promise.resolve();
                //     }
                //   },
                // },
              ]}
            >
              <CommonComponent.Input title={"Số điện thoại"} required />
            </Form.Item>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="">
            <Form.Item name={"username"}>
              <CommonComponent.Input title={"Tài khoản"} disabled />
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
              {/* @ts-ignore */}
              <CommonComponent.SelectNoForm defaultValue={accountInfo.roleId} options={optionsRole ?? []} />
            </Form.Item>
          </div>
        </div>
        <div className="">
          <Label title={"Trạng thái"} required />
          <Form.Item name={"statusUser"}>
            {/* @ts-ignore */}
            <CommonComponent.SelectNoForm defaultValue={accountInfo.statusUser} options={statusUserOptions ?? []} />
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

export default EditAccount;

const statusUserOptions = [
  { label: "Hoạt động", value: 1 },
  { label: "Đã khóa", value: 2 },
];
