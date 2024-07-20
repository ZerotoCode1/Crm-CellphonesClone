import { CommonComponent } from "@/components/common-component";
import { BaseRoute } from "@/constants/baseRoute";
import { useAuth } from "@/providers/AuthenticationProvider";
import authService from "@/services/auth/auth.service";
import type { FormProps } from "antd";
import { Button, Checkbox, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BannerLogin from "@/assets/image/bannerlogin.png";
import logo from "@/assets/logo.svg";
import { iconsSvg } from "@/components/icons-svg";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from "@/helpers/function";
import { COOKIE_KEY } from "@/constants/localStorageKeys";
import { isEmpty } from "lodash";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const res = await authService.login({ username: values.username ?? "", password: values.password ?? "" });
      if (values.remember) {
        setCookie(COOKIE_KEY.ACCOUNT, JSON.stringify(values), 30);
      } else {
        deleteCookie(COOKIE_KEY.ACCOUNT);
      }
      if (res.data.wsResponse) {
        toast.success("Đăng nhập thành công");
        login({ userInfos: res.data.wsResponse, token: res.data.wsResponse.token });
        navigate(BaseRoute.Homepage);
      } else {
        toast.error(res.data.message);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };
  const getAccountCookie = async () => {
    try {
      const user: any = getCookie(COOKIE_KEY.ACCOUNT);
      if (user) {
        const convertUser: FieldType = user ? JSON.parse(user) : {};

        if (!isEmpty(convertUser)) {
          form.setFieldsValue(convertUser);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAccountCookie();
  }, []);
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center login">
      <div className=" w-[100%] lg:w-[55%] relative h-[100vh] ">
        <img className="h-full w-full object-cover" src={BannerLogin} alt="" />
        <div className="login-gradien max-lg:hidden"></div>
        <div className="lg:hidden z-10 opacity-50 absolute top-0 left-0 h-full w-full bg-[#000] "></div>
        <img className="absolute top-2.5 left-2.5 w-[100px] h-[35px] lg:w-[220px] lg:h-[75px] " src={logo} alt="" />
      </div>
      <div className="  lg:w-[45%] max-lg:absolute z-10 w-full h-[100vh] flex justify-center items-center flex-col">
        <h3 className="text-[30px] text-[#fff] lg:text-[#ed1717] mb-10 font-bold ">ĐĂNG NHẬP</h3>
        <Form
          name="basic"
          className=" w-[75%] lg:w-[50%]"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
          form={form}
        >
          <Form.Item<FieldType> name="username" className="w-full" rules={[{ required: true, message: "Vui lòng nhập tên tài khoản" }]}>
            <CommonComponent.Input
              prefix={<iconsSvg.IconBxUser className="mr-2" />}
              className="w-full pl-3 h-[30px] lg:h-[60px]"
              title={"Tên tài khoản"}
              placeholder="Nhập tên tài khoản"
              required
              classLabel="max-lg:text-[#fff]"
            />
          </Form.Item>

          <Form.Item<FieldType> name="password" style={{ marginBottom: "0" }} rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
            <CommonComponent.InputPassword
              placeholder="Nhập mật khẩu"
              prefix={<iconsSvg.IconLock className="mr-2" />}
              className="w-full pl-3 h-[30px] lg:h-[60px]"
              title={"Mật khẩu"}
              required
              classLabel="max-lg:text-[#fff]"
            />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox className="max-lg:text-[#fff] ">Nhớ mật khẩu</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              className="h-[40px] lg:h-[60px] w-full flex justify-center items-center text-[16px] font-bold bg-[#ef1717] btn_login text-[#fff] "
              loading={loading}
              htmlType="submit"
              type="primary"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
