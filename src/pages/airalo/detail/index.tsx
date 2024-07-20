import { CommonComponent } from "@/components/common-component";
import { dateMoment, typeDate } from "@/helpers/date";
import useGetDetailAiraloInfo from "@/hooks/api/control/useDetailAiraloInfo";
import { STATUS_API } from "../../../interfaces/enum";

interface Props {
  id: number;
}

const DetailAiralo = (props: Props) => {
  const { id } = props;
  const { dataDetail } = useGetDetailAiraloInfo(id);
  // const convertResponse = (dataDetail?.response && JSON.parse(dataDetail?.response)) || {};
  // const convertRequest = (dataDetail?.request && JSON.parse(dataDetail?.request)) || {};
  // console.log(convertResponse, "convertResponse");
  return (
    <div>
      <div className="grid grid-cols-4 gap-x-2">
        <div className="">
          <CommonComponent.Input title={"Mã packageId"} value={dataDetail?.packageId} readOnly allowClear={false} />
        </div>
        <div className="">
          <CommonComponent.Input title={"Mã iccid"} value={dataDetail?.iccid} readOnly allowClear={false} />
        </div>
        <div className="">
          <CommonComponent.Input title={"Link"} value={dataDetail?.url} readOnly allowClear={false} />
        </div>
        <div className="">
          <CommonComponent.Input title={"Method"} value={dataDetail?.method} readOnly allowClear={false} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-2 mt-5">
        <div className="">
          <CommonComponent.Input
            title={"Thời gian tạo"}
            value={dataDetail?.createAt ? dateMoment.convertDate(dataDetail?.createAt ?? "", typeDate.yyyymmdd, typeDate.ddmmyyyy) : ""}
            // value={dataDetail?.createAt ? dayjs(dataDetail?.createAt, { format: typeDate.yyyymmdd }) : null}
            readOnly
            allowClear={false}
          />
        </div>
        <div className="">
          <CommonComponent.Input title={"Số lượng"} value={dataDetail?.quantity} readOnly allowClear={false} />
        </div>
        <div className="">
          <CommonComponent.Input title={"Giá"} value={dataDetail?.url} readOnly allowClear={false} />
        </div>
        <div className="">
          <CommonComponent.Input
            title={"Trạng thái"}
            value={dataDetail?.status === STATUS_API.SUCCESS ? "Thành công" : "Thất bại"}
            readOnly
            allowClear={false}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-10">
        <div className="">
          <h3 className="text-[18px] font-bold mb-2">Request</h3>
          <div className="">{dataDetail?.request}</div>

          {/* {Object.entries(convertRequest ?? {}).map(([key, value]: any) => {
            return (
              <div key={key} className="w-full flex mb-2">
                <p className="font-semibold mr-1">{key}: </p> <p>{value}</p>
              </div>
            );
          })} */}
        </div>
        <div className="">
          <h3 className="text-[18px] font-bold mb-2">Response</h3>
          <div className="">{dataDetail?.response}</div>
          {/* {Object.entries(convertResponse?.data ?? {}).map(([key, value]: any) => {
            if (key === "installation_guides" || key === "sims") {
              return "";
            }
            return (
              <div key={key} className="mb-2">
                <span className="font-semibold mr-1">{key}: </span> <span>{value}</span>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default DetailAiralo;
