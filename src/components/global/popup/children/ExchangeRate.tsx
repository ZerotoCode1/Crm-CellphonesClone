import { CommonComponent } from "@/components/common-component";
import Label from "@/components/common-component/form/label";
import { WS_CODE } from "@/constants/apiUrl";
import { requestBaseApi } from "@/helpers/common";
import { STATUS_API } from "@/interfaces/enum";
import LoadingPageService from "@/services/loadingPage";
import { useGet } from "@/stores/useStores";
import { Form } from "antd";
import ExchangeRateServices from "@/services/exchange-rate/exchangeRate.service";
import { toast } from "react-toastify";
import PopupService from "@/services/popupPage";

type FieldType = {
  exchangeRate: string;
  languageCode: string;
  currencyTarget: string;
};

const ExchangeRate = () => {
  const refetch = useGet("listExchangeRate");

  const onFinish = async (values: FieldType) => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.CREATE_EXCHANGE_RATE }),
      wsRequest: {
        ...values,
      },
    };
    try {
      LoadingPageService.instance.current.open();
      const res = await ExchangeRateServices.create(body);
      if (res.data.result.errorCode === STATUS_API.SUCCESS) {
        toast.success("Cập nhập tỉ giá thành công");
        refetch && refetch();
        PopupService.instance.current.close();
      } else {
        toast.error(res.data.result.message ?? "Cập nhập tỉ giá thất bại");
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
      <Form onFinish={onFinish}>
        <div className="">
          <div className="mb-5">
            <CommonComponent.Input value={"USD"} title={"Loại tiền quy đổi mặc định"} placeholder="" readOnly allowClear={false} />
          </div>
          <div className="">
            <Form.Item name={"exchangeRate"}>
              <CommonComponent.Input title={"Tỷ giá"} placeholder="Tỷ giá" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="">
              <Label title={"Mã ngôn ngữ"} required />
              <Form.Item
                name={"languageCode"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng lựa chọn mã ngôn ngữ",
                  },
                ]}
              >
                {/* @ts-ignore */}
                <CommonComponent.SelectNoForm defaultValue="vi" options={optionsLanguage ?? []} placeholder="Mã ngôn ngữ" />
              </Form.Item>
            </div>
            <div className="">
              <Label title={"Loại tiền đến"} required />
              <Form.Item
                name={"currencyTarget"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng lựa chọn loại tiền đến",
                  },
                ]}
              >
                {/* @ts-ignore */}
                <CommonComponent.SelectNoForm defaultValue="VND" options={optionsTypeFromCurrency ?? []} placeholder="Loại tiền đến" />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-x-2 mt-5">
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

export default ExchangeRate;

const optionsLanguage = [{ label: "Tiếng việt", value: "vi" }];
const optionsTypeFromCurrency = [{ label: "VND", value: "VND" }];
