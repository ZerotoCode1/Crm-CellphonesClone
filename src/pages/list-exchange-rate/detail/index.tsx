import { CommonComponent } from "@/components/common-component";
import { dateMoment, typeDate } from "@/helpers/date";
import useGetDetailExchangeRateInfo from "@/hooks/api/exchange-rate/useDetailExchangeRateInfo";

interface Props {
  id: number;
}

const DetailExchangeRate = (props: Props) => {
  const { id } = props;
  const { dataDetail } = useGetDetailExchangeRateInfo(id);

  return (
    <div>
      <div className="grid grid-cols-4 gap-x-2">
        <div className="">
          <CommonComponent.Input value={dataDetail?.currencyFrom} title={"Loại tiền từ"} readOnly allowClear={false} />
        </div>
        <div className="">
          <CommonComponent.Input value={dataDetail?.exchangeRate} title={"Tỷ giá"} readOnly allowClear={false} />
        </div>
        <div className="">
          <CommonComponent.Input value={dataDetail?.languageCode} title={"Mã quốc gia"} readOnly allowClear={false} />
        </div>
        <div className="">
          <CommonComponent.Input value={dataDetail?.currencyTarget} title={"Loại tiền đến"} readOnly allowClear={false} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-2 mt-5">
        <div className="">
          <CommonComponent.Input
            value={dataDetail?.createTime ? dateMoment.convertDate(dataDetail?.createTime ?? "", typeDate.yyyymmdd, typeDate.ddmmyyyy) : ""}
            title={"Thời gian tạo"}
            readOnly
            allowClear={false}
          />
        </div>
        <div className="">
          <CommonComponent.Input value={dataDetail?.createUser} title={"Người tạo"} readOnly allowClear={false} />
        </div>
        <div className="">
          <CommonComponent.Input value={dataDetail?.updateUser} title={"Người chỉnh sửa"} readOnly allowClear={false} />
        </div>
        <div className="">
          <CommonComponent.Input value={dataDetail?.isActive ? "Hoạt động" : "Đã khoá"} title={"Trạng thái"} readOnly allowClear={false} />
        </div>
      </div>
    </div>
  );
};

export default DetailExchangeRate;
