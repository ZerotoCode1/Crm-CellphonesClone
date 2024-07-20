import { CommonComponent } from "@/components/common-component";
import cachedKeys from "@/constants/cachedKeys";
import useGetListCustomer from "@/hooks/api/customer/useGetListCustomer";
import useFiltersHandler from "@/hooks/useFilters";
import { Tooltip } from "antd";
import { debounce } from "lodash";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Eye from "../../components/icons-svg/children/Eye";
import { iconsSvg } from "../../components/icons-svg/index";
import DetailCustomer from "./detail";

interface SEARCH_PARAMS {
  id: number;
}

const CustomerManagement = () => {
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

  const { filters, handleChangePage, handleAddParams, handlePagesize } = useFiltersHandler({
    page: params?.page ? Number(params?.page) - 1 : 0,
    size: params?.size ? Number(params?.size) : 10,
  });
  const { data } = useGetListCustomer(filters, cachedKeys.listOrderEsim);

  const getDataById = (record: any) => {
    navigate(`${location.pathname}?id=${record?.id}`, { state: { customerPhone: record.customerPhone } });
  };

  const columns: any = [
    {
      title: "Họ và tên",
      dataIndex: "customerName",
      width: 100,
      align: "center",
      sorter: (a: any, b: any) => a.customerName.localeCompare(b.customerName),
      render: (value: any) => {
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
      width: 120,
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
      title: "Skyjoy Member",
      dataIndex: "skyjoyMember",
      width: 120,
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

  const onSearchCustomer = debounce((value: string) => {
    handleAddParams({ textSearch: value.trim(), page: 0 });
  }, 300);

  return (
    <div>
      <h2 className="title-page">{searchParams?.id ? "Thông tin khách hàng" : "Danh sách khách hàng"}</h2>
      {searchParams?.id ? (
        <>
          <DetailCustomer id={searchParams?.id} />
        </>
      ) : (
        <>
          <CommonComponent.ContainerBox>
            <div className="grid grid-cols-4 gap-x-2">
              <div className="mb-5">
                <CommonComponent.Input
                  placeholder={"Tìm kiếm tên khách hàng"}
                  onChange={(e) => onSearchCustomer(e.target.value)}
                  prefix={<iconsSvg.Search />}
                />
              </div>
              {/* <div className="mb-5">
                <CommonComponent.Input
                  placeholder={"Tìm kiếm email khách hàng"}
                  onChange={(e) => onSearchCustomer(e.target.value)}
                  prefix={<iconsSvg.Email />}
                />
              </div>
              <div className="mb-5">
                <CommonComponent.Input
                  placeholder={"Tìm kiếm số điện thoại khách hàng"}
                  onChange={(e) => onSearchCustomer(e.target.value)}
                  prefix={<iconsSvg.PhoneSearch />}
                />
              </div> */}
            </div>
            <div className="">
              <CommonComponent.Table
                columns={columns}
                data={data?.customer}
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

export default CustomerManagement;
