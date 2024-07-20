import { CommonComponent } from "@/components/common-component";
import RenderStatus from "@/components/common-component/stauts";
import cachedKeys from "@/constants/cachedKeys";
import { dateMoment, typeDate } from "@/helpers/date";
import useGetListAiralo from "@/hooks/api/control/useGetListAiralo";
import useFiltersHandler from "@/hooks/useFilters";
import { Tooltip } from "antd";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Eye from "../../components/icons-svg/children/Eye";
import DetailAiralo from "./detail";

interface SEARCH_PARAMS {
  id: number;
}

const AiraloControl = () => {
  const [searchParams, setSearchParams] = useState<SEARCH_PARAMS | null>();
  const location = useLocation();
  const navigate = useNavigate();
  const params = queryString.parse(location.search);

  useEffect(() => {
    if (location.search) {
      const searchs = queryString.parse(location.search);
      setSearchParams({ id: Number(searchs.id) });
    } else {
      setSearchParams(null);
    }
  }, [location]);

  const { filters, handleChangePage, handlePagesize } = useFiltersHandler({
    page: params?.page ? Number(params?.page) - 1 : 0,
    size: params?.size ? Number(params?.size) : 10,
  });
  const { data } = useGetListAiralo(filters, cachedKeys.airalo);

  const getDataById = (record: any) => {
    navigate(`${location.pathname}?id=${record?.id}`);
  };

  const columns: any = [
    {
      title: "Mã gói cước",
      dataIndex: "packageId",
      align: "center",
      width: 180,
      render: (value: string) => {
        return (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: "Link ",
      dataIndex: "url",
      align: "center",
      render: (value: string) => {
        return (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createAt",
      width: 200,
      render: (value: string) => {
        return value ? dateMoment.convertDate(value, typeDate.yyyymmhhmmss, typeDate.ddmmyyyyhhmmss) : "";
      },
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (value: string) => value,
      align: "center",
      width: 100,
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (value: string) => value,
      align: "center",
      width: 100,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 150,
      render: (status: "fail" | "success") => <RenderStatus status={status === "success" ? 1 : 2} />,
    },
    {
      fixed: "right",
      title: "Thao tác",
      dataIndex: "action",
      align: "center",
      width: 100,
      render: (_value: string, record: any) => (
        <div className="flex justify-center" onClick={() => getDataById(record)}>
          <Eye />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="title-page">{searchParams?.id ? "Chi tiết log Airalo" : "Danh sách đối soát Airalo"}</h2>
      {searchParams?.id ? (
        <>
          <DetailAiralo id={searchParams?.id} />
        </>
      ) : (
        <>
          <CommonComponent.ContainerBox>
            <div className="">
              <CommonComponent.Table
                columns={columns}
                data={data?.results}
                page={filters.page}
                pageSize={filters.size}
                total={data?.total ?? 20}
                onChangePage={(page) => handleChangePage(page)}
                onChangePageSize={handlePagesize}
              />
            </div>
          </CommonComponent.ContainerBox>
        </>
      )}
    </div>
  );
};

export default AiraloControl;
