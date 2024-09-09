import { CommonComponent } from "@/components/common-component";
import ContainerBox from "@/components/common-component/ContainerBox";
import { WS_CODE } from "@/constants/apiUrl";
import { BaseRoute } from "@/constants/baseRoute";
import cachedKeys from "@/constants/cachedKeys";
import { fieldsTable } from "@/constants/fieldsTable";
import { exportFileBase64, requestBaseApi } from "@/helpers/common";
import { DATE_FORMAT_V2_END, DATE_FORMAT_V2_START } from "@/helpers/date";
import useGetListOrderEsim from "@/hooks/api/order-esim/useGetListOrderEsim";
import useFiltersHandler from "@/hooks/useFilters";
import { PERMISSION_ENUM, STATUS } from "@/interfaces/enum";
import FileServices from "@/services/file/file.service";
import LoadingPageService from "@/services/loadingPage";
import type { FormProps, TableColumnsType } from "antd";
import { Button, Form, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { iconsSvg } from "../../components/icons-svg/index";
import DetailOrderEsim from "./detail/DetailOrderEsim";
import Label from "@/components/common-component/form/label";
import { optionsAppCode } from "@/mocks";
import { CheckRoleAction } from "@/helpers/function";

interface DataType {
  customerName: React.Key;
  customerEmail: string;
  orderCodeSkyfi: number;
  address: string;
  orderCodeVja2: string;
  countryCode: string;
  departureCode: string;
  destinationCode: string;
  price: string;
  quantity: string;
  appCode: string;
  createTime: string;
  orderStatus: string;
  paymentStatus: string;
}

interface SEARCH_PARAMS {
  id: string;
}
const ManagementOrderInformationEsim = () => {
  const [searchParams, setSearchParams] = useState<SEARCH_PARAMS>();
  const location = useLocation();

  const params = queryString.parse(location.search);

  const { filters, handleChangePage, handlePagesize } = useFiltersHandler({
    offset: params?.page ? (Number(params?.page) - 1) * 10 : 0,
    limit: params?.size ? Number(params?.size) : 10,
  });
  const { data } = useGetListOrderEsim(filters, cachedKeys.listOrderEsim);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search) {
      const searchs = queryString.parse(location.search);
      console.log(searchs.id, "werwer");
      setSearchParams({ id: String(searchs.id) });
    } else {
      //@ts-ignore
      setSearchParams(null);
    }
  }, [location]);
  console.log(searchParams, "werwer");

  const columns: TableColumnsType<DataType> = [
    {
      title: "Tên khách hàng",
      dataIndex: "nameCusstormer",
      width: 200,
      align: "left",
      render: (value: string) => {
        return (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "amount",
      width: 200,
      align: "left",
      render: (value: string) => {
        return (
          <Tooltip placement="topLeft" title={value}>
            {Number(value).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Tooltip>
        );
      },
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "method",
      width: 200,
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
      title: "Thời gian đặt hàng",
      dataIndex: "createdAt",
      width: 200,
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
      title: "Số lượng sản phẩm",
      dataIndex: "item",
      width: 200,
      align: "center",
      render: (value: string) => {
        return (
          <Tooltip placement="topLeft" title={value.length}>
            {value.length}
          </Tooltip>
        );
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      width: 200,
      align: "center",
      render: (value: number) => {
        // Xác định trạng thái dựa trên giá trị
        let displayText = "";
        let textColor = "#000000"; // Màu chữ mặc định
        let backgroundColor = "#ffffff"; // Màu nền mặc định
        let borderColor = "#d9d9d9"; // Màu viền mặc định

        switch (value) {
          case 0:
            displayText = "Đã hủy";
            textColor = "#ffffff";
            backgroundColor = "#ff4d4f";
            borderColor = "#ff4d4f";
            break;
          case 1:
            displayText = "Đang chờ xác nhận";
            textColor = "#1890ff";
            backgroundColor = "#e6f7ff";
            borderColor = "#1890ff";
            break;
          case 2:
            displayText = "Đã duyệt";
            textColor = "#52c41a";
            backgroundColor = "#f6ffed";
            borderColor = "#52c41a";
            break;
          case 3:
            displayText = "Đang giao hàng";
            textColor = "#faad14";
            backgroundColor = "#fffbe6";
            borderColor = "#faad14";
            break;
          default:
        }

        return (
          <span
            style={{
              width: "200px",
              padding: "4px 8px",
              border: `1px solid ${borderColor}`, // Màu viền xung quanh văn bản
              borderRadius: "4px", // Bo góc của viền văn bản
              backgroundColor: backgroundColor, // Màu nền của văn bản
              color: textColor, // Màu chữ của văn bản
            }}
          >
            {displayText}
          </span>
        );
      },
    },
    {
      fixed: "right",
      title: "Thao tác",
      dataIndex: "action",
      align: "center",
      width: 100,
      render: (_, record: any) => {
        return (
          <div className="flex justify-center">
            <iconsSvg.Eye onClick={() => navigate(`${location.pathname}?id=${record?._id}`)} />
          </div>
        );
      },
    },
  ];
  console.log(searchParams, "fsdfsđf");

  return (
    <div>
      {searchParams?.id ? (
        <>
          <DetailOrderEsim id={searchParams?.id} />
        </>
      ) : (
        <>
          <h2 className="title-page mb-10">Tất cả đơn hàng CellphoneS</h2>
          <ContainerBox>
            <div className="mt-6 w-full">
              <CommonComponent.Table
                columns={columns}
                data={data?.data ?? []}
                page={filters.offset}
                pageSize={filters.limit}
                //@ts-ignore
                total={data?.totalCount < 10 ? 10 : data?.totalCount ?? 10}
                onChangePage={(page) => handleChangePage(page)}
                onChangePageSize={handlePagesize}
              />
            </div>
          </ContainerBox>
        </>
      )}
    </div>
  );
};

export default ManagementOrderInformationEsim;
