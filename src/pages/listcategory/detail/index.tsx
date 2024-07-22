import { CommonComponent } from "@/components/common-component";
import Label from "@/components/common-component/form/label";
import { WS_CODE } from "@/constants/apiUrl";
import { BaseRoute } from "@/constants/baseRoute";
import { requestBaseApi } from "@/helpers/common";
import useGetDetailPackageInfo from "@/hooks/api/Category/useDetailPackageInfo";
import { STATUS, STATUS_API } from "@/interfaces/enum";
import LoadingPageService from "@/services/loadingPage";
import PackageServices from "@/services/package/package.service";
import { Form, Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  id: string;
}

type FieldType = {
  pricePromotion: string | number;
  isSeller: STATUS;
  packageName: string;
};

const DetailPackage = (props: Props) => {
  const { id } = props;
  const [isHidden, setIsHidden] = useState<STATUS>();
  const [isSeller, setIsSeller] = useState<STATUS>();
  const { dataDetail } = useGetDetailPackageInfo(id);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values: FieldType) => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.UPDATE_PACKAGE }),
      wsRequest: {
        ...values,
        packageId: dataDetail?.packageId ?? "",
        isHidden: isHidden,
        isSeller: values.pricePromotion === 0 ? false : true,
      },
    };
    try {
      LoadingPageService.instance.current.open();
      //@ts-ignore
      const res = await PackageServices.update(body);
      if (res.data.result.errorCode === STATUS_API.SUCCESS) {
        toast.success("Cập nhập gói cước thành công");
      } else {
        toast.error(res.data.result.message ?? "Cập nhập gói cước thất bại");
      }
    } catch {
    } finally {
      LoadingPageService.instance.current.close();
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      pricePromotion: dataDetail?.pricePromotion,
      isSeller: dataDetail?.pricePromotion ? 1 : 0,
      packageName: dataDetail?.packageName,
    });
    setIsSeller(dataDetail?.pricePromotion ? 1 : 0);
    setIsHidden(dataDetail?.isHidden ? 1 : 0);
  }, [dataDetail]);

  const onChange = (e: RadioChangeEvent) => {
    setIsHidden(e.target.value);
  };

  const onCancel = () => {
    navigate(BaseRoute.ListPackage);
  };

  return (
    <div className="flex flex-wrap gap-x-2">
      <div className="w-full">
        <Form form={form} onFinish={onFinish}>
          <div className="grid grid-cols-2 gap-x-2">
            <div className="">
              <CommonComponent.Input value={dataDetail?.countryCode} title={"Quốc gia"} disabled />
            </div>
            <div className="">
              <CommonComponent.Input value={dataDetail?.title} title={"Tiêu đề"} disabled />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-2 mt-5">
            <div className="">
              <CommonComponent.Input value={dataDetail?.packageId} title={"Mã gói cước"} disabled />
            </div>
            <div className="">
              <Form.Item name={"packageName"}>
                <CommonComponent.Input title={"Nhập tên gói cước"} />
              </Form.Item>
            </div>
            <div className="">
              <CommonComponent.Input value={dataDetail?.price} title={"Giá (chưa khuyến mãi)"} disabled />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-2">
            <div className="">
              <CommonComponent.Input value={dataDetail?.sms} title={"SMS"} disabled />
            </div>
            <div className="">
              <CommonComponent.Input value={dataDetail?.voice} title={"Gọi"} disabled />
            </div>
            <div className="">
              <CommonComponent.Input value={dataDetail?.data} title={"Data/1 ngày"} disabled />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-2 mt-5">
            <div className="">
              <CommonComponent.Input value={dataDetail?.pricePromotion} title={"Giá (gốc)"} disabled />
            </div>
            <div className="">
              <CommonComponent.Input value={dataDetail?.currency} title={"Tiền tệ"} disabled />
            </div>
            <div className="">
              <CommonComponent.Input value={dataDetail?.amount} title={"Số lượng"} disabled />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-2 mt-5">
            <div className="">
              <CommonComponent.Input value={dataDetail?.pricePromotion} title={"Loại gói"} disabled />
            </div>
            <div className="">
              <Form.Item
                name={"pricePromotion"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập dữ liệu!",
                  },
                  {
                    pattern: /^[0-9]*\.?[0-9]+$/,
                    message: "Nhập không đúng định dạng !",
                  },
                  {
                    validator: (_, value) => (value === 0 && isSeller ? Promise.reject("Vui lòng nhập một số lớn hơn 0!") : Promise.resolve()),
                  },
                ]}
              >
                <CommonComponent.Input title={"Giá khuyến mãi"} disabled={isSeller ? false : true} />
              </Form.Item>
            </div>
            <div className="">
              <Form.Item name={"isSeller"}>
                <Label title={"Gói khuyến mãi"} />
                <CommonComponent.SelectNoForm
                  //@ts-ignore
                  defaultValue={dataDetail?.pricePromotion ? 0 : 1}
                  title={"Gói khuyến mãi"}
                  options={optionsIsSeller}
                  onChange={(value: any) => {
                    setIsSeller(value);
                    form.setFieldValue("pricePromotion", 0);
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="">
            <Radio.Group onChange={onChange} value={isHidden}>
              <Radio value={0}>Hiện gói cước</Radio>
              <Radio value={1}>Ẩn gói cước</Radio>
            </Radio.Group>
          </div>
          <div className="flex justify-center gap-x-2 mt-10">
            <CommonComponent.Button onClick={onCancel} style={{ padding: "12px 35px" }}>
              Quay về
            </CommonComponent.Button>

            <CommonComponent.Button htmlType="submit" type={"primary"} style={{ padding: "12px 50px" }}>
              Lưu
            </CommonComponent.Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DetailPackage;

const optionsIsSeller = [
  { label: "Không", value: 0 },
  { label: "Có", value: 1 },
];
