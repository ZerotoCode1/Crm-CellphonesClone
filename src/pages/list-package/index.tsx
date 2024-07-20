import { CommonComponent } from "@/components/common-component";
import ImportPackage from "@/components/global/popup/children/ImportPackage";
import { WS_CODE } from "@/constants/apiUrl";
import cachedKeys from "@/constants/cachedKeys";
import { statusMessages } from "@/constants/messages";
import { exportFileBase64, requestBaseApi } from "@/helpers/common";
import useGetLisPackage from "@/hooks/api/package/useGetListPackage";
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

interface SEARCH_PARAMS {
  id: string;
}

const ListPackage = () => {
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
    page: params?.page ? Number(params?.page) - 1 : 0,
    size: params?.size ? Number(params?.size) : 10,
  });

  const { data } = useGetLisPackage(filters, cachedKeys.listPackage);

  const renderColumnsRoles = () => {
    const columns: any = [
      {
        title: "Mã gói cước",
        dataIndex: "packageId",
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
        title: "Tên gói cước",
        dataIndex: "packageName",
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
      // {
      //   title: "Thời gian tạo",
      //   dataIndex: "createTime",
      //   width: 150,
      //   render: (value: string) => moment(value).format(typeDate.mmddyyyy),
      //   align: "center",
      // },
      {
        title: "Dữ liệu",
        dataIndex: "data",
        align: "center",
        width: 80,
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
        dataIndex: "price",
        width: 80,
        render: (value: string) => value,
        align: "center",
      },
      {
        title: "Tiền tệ",
        dataIndex: "currency",
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
  const onSyncPackage = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.SYNC_PACKAGE }),
      wsRequest: {},
    };
    try {
      LoadingPageService.instance.current.open();

      const res = await PackageServices.sync(body);
      if (res.data.result.errorCode === STATUS_API.SUCCESS) {
        toast.success("Đồng bộ gói cước thành công");
        reFetch();
      } else {
        toast.error(res.data.result.message ?? "Đồng bộ gói cước thất bại");
      }
    } catch {
    } finally {
      LoadingPageService.instance.current.close();
    }
  };

  const onExportPackage = async () => {
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.EXPORT_PACKAGE }),
      wsRequest: null,
    };
    try {
      LoadingPageService.instance.current.open();
      //@ts-ignore
      const res = await PackageServices.export(body);
      exportFileBase64(res.data.result.wsResponse.file, "");
      if (res.data.result.errorCode === STATUS_API.SUCCESS) {
        toast.success(statusMessages.exportSuccess);
      } else {
        toast.error(res.data.result.message ?? statusMessages.exportFail);
      }
    } catch {
    } finally {
      LoadingPageService.instance.current.close();
    }
  };

  const onImport = () => {
    PopupService.instance.current.open({
      visible: true,
      content: <ImportPackage />,
      title: "Tải file excel",
    });
  };

  return (
    <div>
      <h2 className="title-page">{searchParams?.id ? "Cập nhật gói cước" : "Danh sách gói cước"}</h2>
      {searchParams?.id ? (
        <>
          <DetailPackage id={searchParams?.id} />
        </>
      ) : (
        <>
          <CommonComponent.ContainerBox>
            <div className="flex justify-end gap-x-3 mb-5">
              {CheckRoleAction([PERMISSION_ENUM.SYSTEMADMIN]) && (
                <CommonComponent.Button type={"primary"} icon={<iconsSvg.Sync />} onClick={onSyncPackage}>
                  Đồng bộ gói cước
                </CommonComponent.Button>
              )}
              {CheckRoleAction([PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS]) && (
                <CommonComponent.ExportButton onClick={onExportPackage} />
              )}
              {CheckRoleAction([PERMISSION_ENUM.SYSTEMADMIN]) && <CommonComponent.ImportButton onClick={onImport} />}
            </div>
            <div className="">
              <CommonComponent.Table
                columns={renderColumnsRoles()}
                data={data?.packages}
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

export default ListPackage;
