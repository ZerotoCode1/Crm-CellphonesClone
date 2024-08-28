import { CommonComponent } from "@/components/common-component";
import ContainerBox from "@/components/common-component/ContainerBox";
import Label from "@/components/common-component/form/label";
import { WS_CODE } from "@/constants/apiUrl";
import cachedKeys from "@/constants/cachedKeys";
import { fieldsTable } from "@/constants/fieldsTable";
import { exportFileBase64, requestBaseApi } from "@/helpers/common";
import { DATE_FORMAT_V2_END, DATE_FORMAT_V2_START } from "@/helpers/date";
import { CheckRoleAction } from "@/helpers/function";
import useGetListProduct from "@/hooks/api/Product/useGetListProDuct";
import useFiltersHandler from "@/hooks/useFilters";
import { PERMISSION_ENUM } from "@/interfaces/enum";
import { optionsAppCode } from "@/mocks";
import FileServices from "@/services/file/file.service";
import LoadingPageService from "@/services/loadingPage";
import type { FormProps } from "antd";
import { Button, Form, Tooltip } from "antd";
import moment from "moment";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { iconsSvg } from "../../components/icons-svg/index";
import DetailProduct from "./detail";
import { BaseRoute } from "@/constants/baseRoute";
import PopupService from "@/services/popupPage";
import DeleteCategory from "@/components/global/popup/children/Category/DeleteCategory";
import DeleteProduct from "@/components/global/popup/children/Product/DeleteProduct";

type FieldType = {
  productName?: string;
  customerEmail?: string;
  startTime?: string;
  endTime?: string;
  countryCode: string;
  departureCode?: string;
  destinationCode?: string;
  orderCodeSkyfi?: string;
  orderCodeAiralo?: string;
  orderCodeThirdParty?: string;
  appCode?: string;
};

interface SEARCH_PARAMS {
  id: string;
}
const ListEsimSold = () => {
  const [searchParams, setSearchParams] = useState<SEARCH_PARAMS>();

  const location = useLocation();

  const params = queryString.parse(location.search);

  const { filters, handleChangePage, handlePagesize } = useFiltersHandler({
    offset: params?.page ? (Number(params?.page) - 1) * 10 : 0,
    limit: params?.size ? Number(params?.size) : 10,
  });
  const { data } = useGetListProduct(filters, cachedKeys.ListCategory);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search) {
      const searchs = queryString.parse(location.search) as { id: string };
      setSearchParams({ id: searchs.id ?? "" });
    } else {
      //@ts-ignore
      setSearchParams(null);
    }
  }, [location]);

  const columns: any = [
    {
      title: "Mã sản phẩm",
      dataIndex: "_id",
      width: 200,
      align: "center",
      sorter: (a: any, b: any) => a.orderCode.localeCompare(b.orderCode),
      render: (value: string) => {
        return (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      width: 200,
      align: "center",
      sorter: (a: any, b: any) => a?.orderCodeThirdParty?.localeCompare(b?.orderCodeThirdParty),
      render: (value: string) => {
        return (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      width: 200,
      align: "center",
      sorter: (a: any, b: any) => a.orderCodeAiralo.localeCompare(b.orderCodeAiralo),
      render: (value: string) => {
        return (
          <Tooltip placement="topLeft" title={value} className="flex justify-center w-full">
            <img src={value[0]} height={40} width={40} />
          </Tooltip>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
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
      title: "Mô tả",
      dataIndex: "description",
      width: 100,
      align: "center",
    },
    {
      title: "Danh mục",
      dataIndex: "category_id",
      width: 150,
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 200,
      align: "center",
      render: (value: string) => value,
    },
    {
      title: "Ngày tạo",
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
      fixed: "right",
      title: "Thao tác",
      dataIndex: "action",
      align: "center",
      width: 100,
      render: (_: any, record: any) => (
        <div className="flex justify-center gap-4">
          <iconsSvg.Delete onClick={() => hanleDelete(record?._id, record?.image)} />
          <iconsSvg.Edit onClick={() => navigate(`${BaseRoute.EditProduct}?id=${record?._id}`)} />
        </div>
      ),
    },
  ];
  const hanleDelete = async (id: string, imagename: string) => {
    PopupService.instance.current.open({
      visible: true,
      content: <DeleteProduct imageName={imagename} id={id} />,
      title: "Xoá sản phẩm",
    });
  };
  return (
    <div>
      <h2 className="title-page">{searchParams?.id ? "Chi tiết sản phẩm" : "Danh sách sản phẩm"}</h2>
      {searchParams?.id ? (
        <>
          <DetailProduct id={searchParams?.id} />
        </>
      ) : (
        <>
          <ContainerBox>
            <CommonComponent.Button onClick={() => navigate(BaseRoute.CreateProduct)} type="primary">
              Thêm mới{" "}
            </CommonComponent.Button>
            <div className="mt-6">
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

export default ListEsimSold;
