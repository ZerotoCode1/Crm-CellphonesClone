import { CommonComponent } from "@/components/common-component";
import ImportPackage from "@/components/global/popup/children/ImportPackage";
import { WS_CODE } from "@/constants/apiUrl";
import cachedKeys from "@/constants/cachedKeys";
import { statusMessages } from "@/constants/messages";
import { exportFileBase64, requestBaseApi } from "@/helpers/common";
import useGetLisCategory from "@/hooks/api/package/useGetListCategory";
import useFiltersHandler from "@/hooks/useFilters";
import { PERMISSION_ENUM, STATUS_API } from "@/interfaces/enum";
import LoadingPageService from "@/services/loadingPage";
import PackageServices from "@/services/package/package.service";
import PopupService from "@/services/popupPage";
import { Tooltip } from "antd";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { iconsSvg } from "../../components/icons-svg/index";
import DetailPackage from "./detail";
import { CheckRoleAction } from "@/helpers/function";
import CreateCategory from "@/components/global/popup/children/Category/CreateCategory";

interface SEARCH_PARAMS {
  id: string;
}

const ListCategory = () => {
  const [searchParams, setSearchParams] = useState<SEARCH_PARAMS | any>();
  const location = useLocation();
  const navigate = useNavigate();
  const params = queryString.parse(location.search);

  useEffect(() => {
    if (location.search) {
      const searchs = queryString.parse(location.search);
      setSearchParams({ id: searchs.id ?? "" });
    } else {
      setSearchParams(null);
    }
  }, [location]);

  const { filters, handleChangePage, handlePagesize, reFetch } = useFiltersHandler({
    // page: params?.page ? Number(params?.page) - 1 : 0,
    limit: params?.size ? Number(params?.size) : 10,
  });

  const { data } = useGetLisCategory(filters, cachedKeys.listPackage);

  console.log(data, "fdsfdsfds");

  const renderColumnsRoles = () => {
    const columns: any = [
      {
        title: "Id danh mục",
        dataIndex: "_id",
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
        title: "Tên danh mục",
        dataIndex: "name",
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
        title: "Icon danh mục",
        dataIndex: "image",
        align: "center",
        width: 80,
        render: (value: string) => {
          return (
            <Tooltip placement="topLeft" title={value}>
              <img src={value} alt="" className="w-10 h-10" />
            </Tooltip>
          );
        },
      },
      {
        title: "Miêu tả",
        dataIndex: "description",
        width: 80,
        render: (value: string) => value,
        align: "center",
      },
      {
        title: "Thời gian tạo",
        dataIndex: "createdAt",
        width: 80,
        render: (value: string) => value,
        align: "center",
      },
      {
        title: "Thời gian cập nhật",
        dataIndex: "updatedAt",
        width: 80,
        render: (value: string) => value,
        align: "center",
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
              <iconsSvg.Edit onClick={() => navigate(`${location.pathname}?id=${record?.packageId}`)} />
            </div>
          );
        },
      });
    }
    return columns;
  };
  const createCategory = () => {
    PopupService.instance.current.open({
      visible: true,
      content: <CreateCategory />,
      title: "Thêm danh mục",
    });
  };

  return (
    <div>
      <h2 className="title-page">{searchParams?.id ? "Cập nhật danh mục" : "Danh sách danh mục"}</h2>
      {searchParams?.id ? (
        <>
          <DetailPackage id={searchParams?.id} />
        </>
      ) : (
        <>
          <CommonComponent.ContainerBox>
            <div className="flex justify-end gap-x-3 mb-5">
              <CommonComponent.Button type={"primary"} icon={<iconsSvg.Sync />} onClick={createCategory}>
                Thêm danh mục
              </CommonComponent.Button>
            </div>
            <div className="">
              <CommonComponent.Table
                columns={renderColumnsRoles()}
                data={data?.data ?? []}
                page={filters.page ?? 0}
                pageSize={filters.limit}
                total={data?.total ?? 0}
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

export default ListCategory;
