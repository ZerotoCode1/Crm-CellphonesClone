import { CommonComponent } from "@/components/common-component";
import RenderStatus from "@/components/common-component/stauts";
import EditAccount from "@/components/global/popup/children/EditAccount";
import cachedKeys from "@/constants/cachedKeys";
import { dateMoment, typeDate } from "@/helpers/date";
import useGetListAccount from "@/hooks/api/account/useGetListAccount";
import useFiltersHandler from "@/hooks/useFilters";
import PopupService from "@/services/popupPage";
import { Tooltip } from "antd";
import { debounce } from "lodash";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { iconsSvg } from "../../components/icons-svg/index";
import ChangePassword from "@/components/global/popup/children/ChangePassword";
import CreateAccount from "@/components/global/popup/children/CreateAccount";
import { PERMISSION_ENUM, STATUS } from "@/interfaces/enum";
import { CheckRoleAction } from "@/helpers/function";

const AccountManagement = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);

  const { filters, handleChangePage, handleAddParams, handlePagesize, handleFirstPage } = useFiltersHandler({
    page: params?.page ? Number(params?.page) - 1 : 0,
    pageSize: params?.size ? Number(params?.size) : 10,
    statusUser: -1,
    username: "",
    phone: "",
  });

  const { data } = useGetListAccount(filters, cachedKeys.listAccount);

  const renderColumnsRoles = () => {
    const columns: any = [
      {
        title: "Tài khoản",
        dataIndex: "username",
        width: 120,
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
        dataIndex: "email",
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
        dataIndex: "phone",
        width: 100,
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
        dataIndex: "createTime",
        width: 150,
        align: "center",
        render: (value: string) => dateMoment.convertDate(value, typeDate.yyyymmhhmmss, typeDate.ddmmyyyyhhmmss),
      },
      {
        title: "Quyền",
        dataIndex: "roleName",
        width: 120,
        align: "center",
      },
      {
        title: "Trạng thái",
        dataIndex: "statusUser",
        width: 100,
        align: "center",
        render: (status: STATUS) => <RenderStatus status={status} />,
      },
    ];
    if (CheckRoleAction([PERMISSION_ENUM.SYSTEMADMIN])) {
      columns.push({
        fixed: "right",
        title: "Thao tác",
        width: 80,
        dataIndex: "id",
        align: "center",
        render: (_value: string, record: any) => (
          <div className="flex justify-center">
            <div
              className="px-1"
              onClick={() => {
                PopupService.instance.current.open({
                  visible: true,
                  title: "Cập nhật tài khoản",
                  content: <EditAccount accountInfo={record} />,
                });
              }}
            >
              <iconsSvg.Edit />
            </div>
            <div
              className="px-1"
              onClick={() => {
                PopupService.instance.current.open({
                  visible: true,
                  title: "Đổi mật khẩu",
                  content: <ChangePassword accountInfo={record} />,
                });
              }}
            >
              <iconsSvg.Key />
            </div>
          </div>
        ),
      });
    }
    return columns;
  };
  const onSearchCustomer = debounce((value: string, fieldSearch: "username" | "phone" | "statusUser") => {
    handleAddParams({ [fieldSearch]: value.trim(), page: 0 });
  }, 300);

  const onSearchStatus = (value: number | string) => {
    handleAddParams({ statusUser: value, page: 0 });
  };

  const onCreateAccount = () => {
    PopupService.instance.current.open({
      visible: true,
      content: <CreateAccount onFirstPage={handleFirstPage} />,
      title: "Thêm mới Tài khoản",
    });
  };

  return (
    <div>
      <h2 className="title-page">Danh sách Tài khoản</h2>
      <CommonComponent.ContainerBox>
        <div className="flex justify-between">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-x-2">
            <div className="mb-5">
              <CommonComponent.Input
                placeholder={"Tìm kiếm tên tài khoản"}
                onChange={(e) => onSearchCustomer(e.target.value, "phone")}
                prefix={<iconsSvg.Search />}
              />
            </div>
            <div className="mb-5">
              <CommonComponent.Input
                placeholder={"Tìm kiếm số điện thoại"}
                onChange={(e) => onSearchCustomer(e.target.value, "phone")}
                prefix={<iconsSvg.PhoneSearch />}
              />
            </div>
            <div className="mb-5">
              <CommonComponent.SelectNoForm
                options={statusAccount}
                onChange={(value) => {
                  onSearchStatus(value);
                }}
                placeholder={"Trạng thái"}
              />
            </div>
          </div>
          <div className="">
            {CheckRoleAction([PERMISSION_ENUM.SYSTEMADMIN]) && (
              <CommonComponent.Button type={"primary"} onClick={onCreateAccount} icon={<iconsSvg.Add />}>
                Thêm mới
              </CommonComponent.Button>
            )}
          </div>
        </div>

        <div className="">
          <CommonComponent.Table
            columns={renderColumnsRoles()}
            data={data?.userResponeList}
            page={filters.page}
            pageSize={filters.pageSize}
            total={data?.totalItem ?? 20}
            onChangePage={(page) => handleChangePage(page)}
            onChangePageSize={handlePagesize}
          />
        </div>
      </CommonComponent.ContainerBox>
    </div>
  );
};

export default AccountManagement;

const statusAccount = [
  { label: "Tất cả", value: -1 },
  { label: "Đang hoạt động", value: 1 },
  { label: "Đã khóa", value: 2 },
];
