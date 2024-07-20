import { CommonComponent } from "@/components/common-component";
import RenderStatus from "@/components/common-component/stauts";
import cachedKeys from "@/constants/cachedKeys";
import { dateMoment, typeDate } from "@/helpers/date";
import useGetListExchangeRate from "@/hooks/api/exchange-rate/useGetListExchangeRate";
import useFiltersHandler from "@/hooks/useFilters";
import { PERMISSION_ENUM, STATUS } from "@/interfaces/enum";
import { Tooltip } from "antd";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Eye from "../../components/icons-svg/children/Eye";
import { iconsSvg } from "../../components/icons-svg/index";
import DetailExchangeRate from "./detail";
import PopupService from "@/services/popupPage";
import ExchangeRate from "@/components/global/popup/children/ExchangeRate";
import { CheckRoleAction } from "@/helpers/function";

interface SEARCH_PARAMS {
  id: number;
}

const ListExchangeRate = () => {
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
  const { data } = useGetListExchangeRate(filters, cachedKeys.listExchangeRate);

  const getDataById = (record: any) => {
    navigate(`${location.pathname}?id=${record?.id}`);
  };

  const columns: any = [
    {
      title: "Loại tiền từ",
      dataIndex: "currencyFrom",
      width: 150,
      align: "center",
      render: (value: any) => {
        return (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: "Mã ngôn ngữ",
      dataIndex: "languageCode",
      width: 150,
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
      title: "Tỷ giá",
      dataIndex: "exchangeRate",
      width: 150,
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
      title: "Loại tiền đến",
      dataIndex: "currencyFrom",
      width: 150,
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
      title: "Thời gian bắt đầu",
      dataIndex: "startTime",
      align: "center",
      width: 200,

      render: (value: string) => {
        return (
          <Tooltip placement="topLeft" title={value}>
            {value ? dateMoment.convertDate(value, typeDate.yyyymmhhmmss, typeDate.ddmmyyyyhhmmss) : ""}
          </Tooltip>
        );
      },
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "endTime",
      align: "center",
      width: 200,

      render: (value: string) => {
        return (
          <Tooltip placement="topLeft" title={value}>
            {value ? dateMoment.convertDate(value, typeDate.yyyymmhhmmss, typeDate.ddmmyyyyhhmmss) : ""}
          </Tooltip>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      width: 150,
      align: "center",

      render: (value: STATUS) => {
        return (
          <Tooltip placement="topLeft" title={value}>
            <RenderStatus status={value ? 1 : 2} />
          </Tooltip>
        );
      },
    },
    {
      fixed: "right",
      title: "Thao tác",
      width: 80,
      dataIndex: "id",
      align: "center",
      render: (_value: string, record: any) => (
        <div className="flex justify-center" onClick={() => getDataById(record)}>
          <Eye />
        </div>
      ),
    },
  ];

  const onCreate = () => {
    PopupService.instance.current.open({
      visible: true,
      title: "Thêm mới tỷ giá",
      content: <ExchangeRate />,
    });
  };

  return (
    <div>
      <h2 className="title-page">{searchParams?.id ? "Chi tiết tỷ giá" : "Danh sách tỷ giá"}</h2>
      {searchParams?.id ? (
        <>
          <DetailExchangeRate id={searchParams?.id} />
        </>
      ) : (
        <>
          <CommonComponent.ContainerBox>
            {CheckRoleAction([PERMISSION_ENUM.SYSTEMADMIN]) && (
              <div className="flex justify-end">
                <CommonComponent.Button type={"primary"} icon={<iconsSvg.Add />} onClick={onCreate}>
                  Thêm mới
                </CommonComponent.Button>
              </div>
            )}
            <div className="mt-5">
              <CommonComponent.Table
                columns={columns}
                data={data?.result}
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

export default ListExchangeRate;
