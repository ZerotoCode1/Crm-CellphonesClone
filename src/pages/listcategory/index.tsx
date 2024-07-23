import { CommonComponent } from "@/components/common-component";
import CreateCategory from "@/components/global/popup/children/Category/CreateCategory";
import DeleteCategory from "@/components/global/popup/children/Category/DeleteCategory";
import cachedKeys from "@/constants/cachedKeys";
import { CheckRoleAction } from "@/helpers/function";
import useGetLisCategory from "@/hooks/api/Category/useGetListCategory";
import useFiltersHandler from "@/hooks/useFilters";
import { PERMISSION_ENUM } from "@/interfaces/enum";
import PopupService from "@/services/popupPage";
import { Tooltip } from "antd";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { iconsSvg } from "../../components/icons-svg/index";
import DetailPackage from "./detail";

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
    offset: params?.page ? (Number(params?.page) - 1) * 10 : 0,
    limit: params?.size ? Number(params?.size) : 10,
  });
  const { data } = useGetLisCategory(filters, cachedKeys.ListCategory);
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
              <div className="w-full flex justify-center">
                <img src={value} alt="" className="w-10 h-10" />
              </div>
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
            <div className="flex justify-center gap-4">
              <iconsSvg.Edit onClick={() => createCategory("edit", record?._id)} />
              <iconsSvg.Delete onClick={() => deleteCategory(record?._id, record?.imageName)} />
            </div>
          );
        },
      });
    }
    return columns;
  };
  const deleteCategory = (id: string, imagename: string) => {
    PopupService.instance.current.open({
      visible: true,
      content: <DeleteCategory imageName={imagename} id={id} />,
      title: "Xoá danh mục",
    });
  };
  const createCategory = (type: "edit" | "create", id?: string) => {
    PopupService.instance.current.open({
      visible: true,
      content: <CreateCategory type={type} id={id} />,
      title: type === "edit" ? "Cập nhật danh mục" : "Thêm danh mục",
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
              <CommonComponent.Button type={"primary"} icon={<iconsSvg.Sync />} onClick={() => createCategory("create")}>
                Thêm danh mục
              </CommonComponent.Button>
            </div>
            <div className="">
              <CommonComponent.Table
                columns={renderColumnsRoles()}
                data={data?.data ?? []}
                page={Number(filters.offset) ?? 0}
                pageSize={Number(filters.limit) ?? 10}
                total={Number(data?.totalCount) ?? 0}
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
