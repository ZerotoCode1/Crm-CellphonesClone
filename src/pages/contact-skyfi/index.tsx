import { CommonComponent } from "@/components/common-component";
import cachedKeys from "@/constants/cachedKeys";
import { CheckRoleAction } from "@/helpers/function";
import useGetListContact from "@/hooks/api/contact/useGetListContact";
import useFiltersHandler from "@/hooks/useFilters";
import { PERMISSION_ENUM, STATUS } from "@/interfaces/enum";
import { Tooltip } from "antd";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { iconsSvg } from "../../components/icons-svg/index";
import DetailContact from "./detail";

interface SEARCH_PARAMS {
  id: number;
}

const ManagementContact = () => {
  const [searchParams, setSearchParams] = useState<SEARCH_PARAMS | null>();
  const location = useLocation();
  const navigate = useNavigate();
  const params = queryString.parse(location.search);
  // const refetch = useGet("listContact");

  useEffect(() => {
    if (location.search) {
      const searchs = queryString.parse(location.search);
      setSearchParams({ id: Number(searchs.id) });
    } else {
      setSearchParams(null);
    }
  }, [location]);

  const { filters, handleChangePage, handleAddParams, handlePagesize, reFetch } = useFiltersHandler({
    page: params?.page ? Number(params?.page) - 1 : 0,
    size: params?.size ? Number(params?.size) : 10,
    status: "",
  });

  const { data } = useGetListContact(filters, cachedKeys.listContact);

  const renderColumnsRoles = () => {
    const columns: any = [
      {
        title: "Chủ đề",
        dataIndex: "subject",
        width: 150,
        align: "center",
      },
      {
        title: "Họ tên khách hàng",
        dataIndex: "customerName",
        width: 150,
        align: "center",
        sorter: (a: any, b: any) => a.customerName.localeCompare(b.customerName),
        render: (value: string) => {
          return (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          );
        },
      },
      {
        title: "Email",
        dataIndex: "customerEmail",
        width: 150,
        align: "center",
        sorter: (a: any, b: any) => a.customerEmail.localeCompare(b.customerEmail),
        render: (value: string) => {
          return (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          );
        },
      },
      {
        title: "Số điện thoại",
        dataIndex: "customerPhone",
        width: 150,
        align: "center",
        sorter: (a: any, b: any) => a.customerPhone - b.customerPhone,
        render: (value: string) => {
          return (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          );
        },
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        width: 120,
        align: "center",
        render: (value: STATUS) => {
          return value === 1 ? "Nhận thông tin" : "Đã phản hồi";
        },
      },
    ];
    if (CheckRoleAction([PERMISSION_ENUM.SYSTEMADMIN])) {
      columns.push({
        fixed: "right",
        title: "Thao tác",
        dataIndex: "action",
        align: "center",
        width: 80,
        render: (_: any, record: any) => {
          return (
            <div className="flex justify-center">
              <iconsSvg.Edit onClick={() => navigate(`${location.pathname}?id=${record?.id}`)} />
            </div>
          );
        },
      });
    }

    return columns;
  };

  const onSearchStatus = (value: number | string) => {
    handleAddParams({ status: value, page: 0 });
  };

  return (
    <div>
      {searchParams?.id ? (
        <DetailContact id={searchParams?.id} refetch={reFetch} />
      ) : (
        <CommonComponent.ContainerBox>
          <h2 className="title-page">Liên hệ Skyfi</h2>
          <div className="mb-5 max-w-[250px]">
            <CommonComponent.SelectNoForm defaultValue="" placeholder={"Tìm kiếm tên khách hàng"} options={options} onChange={onSearchStatus} />
          </div>
          <div className="">
            <CommonComponent.Table
              columns={renderColumnsRoles()}
              data={data?.contacts}
              page={filters.page}
              pageSize={filters.size}
              total={data?.total ?? 20}
              onChangePage={(page) => handleChangePage(page)}
              onChangePageSize={handlePagesize}
            />
          </div>
        </CommonComponent.ContainerBox>
      )}
    </div>
  );
};

export default ManagementContact;

const options = [
  { label: "Tất cả", value: "" },
  { label: "Nhận thông tin", value: 1 },
  { label: "Đã phản hồi", value: 2 },
];
