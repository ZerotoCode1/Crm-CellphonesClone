import { CommonComponent } from "@/components/common-component";
import { iconsSvg } from "@/components/icons-svg";
import cachedKeys from "@/constants/cachedKeys";
import { SUCCESS } from "@/constants/common";
import { CheckRoleAction } from "@/helpers/function";
import useDeviceManagement from "@/hooks/api/deviceManagement/useDeviceManagement";
import useFiltersHandler from "@/hooks/useFilters";
import { PERMISSION_ENUM } from "@/interfaces/enum";
import deviceManagementService, { DeviceManagement as DeviceManagementInterface } from "@/services/device-management/deviceManagement.service";
import { useGet } from "@/stores/useStores";

import { Tooltip } from "antd";
import queryString from "query-string";
import { toast } from "react-toastify";

const DeviceManagement = () => {
  const params = queryString.parse(location.search);
  const defaultPrams = {
    page: params?.page ? Number(params?.page) - 1 : 0,
    size: params?.size ? Number(params?.size) : 10,
  };
  const { filters, handleChangePage, handlePagesize } = useFiltersHandler(defaultPrams);
  const { data, loading } = useDeviceManagement(filters, cachedKeys.device);
  const refetch = useGet("device");
  const columns: any = [
    {
      title: "Hãng điện thoại",
      dataIndex: "name",
      width: 150,
      align: "center",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (value: any) => {
        return (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: "Tổng số thiết bị",
      dataIndex: "email",
      width: 150,
      align: "center",
      render: (_: any, record: any) => record.devices.length,
    },
    {
      title: "Danh sách thiết bị",
      dataIndex: "phone",
      width: 200,
      align: "center",
      render: (_: any, record: DeviceManagementInterface) => {
        return record.devices.map((item, index) => {
          return (
            <Tooltip title={item.name}>
              <div key={index}>
                <p>{item.name}</p>
              </div>
            </Tooltip>
          );
        });
      },
    },
  ];
  const handleSynchronized = async () => {
    try {
      const res = await deviceManagementService.synchronized();
      if (res.data.result.errorCode === SUCCESS) {
        toast.success("Đồng bộ thành công !");
        refetch && refetch();
      }
    } catch (e) {}
  };

  return (
    <div>
      <CommonComponent.ContainerBox>
        <h2 className="title-page">Danh sách thiết bị</h2>
        {CheckRoleAction([PERMISSION_ENUM.SYSTEMADMIN]) && (
          <div className="flex justify-end  mb-5">
            <CommonComponent.Button
              onClick={handleSynchronized}
              className="btn-rdu"
              size="large"
              type="primary"
              htmlType="submit"
              icon={<iconsSvg.Redo fill="#fff" />}
            >
              Đồng bộ thiết bị
            </CommonComponent.Button>
          </div>
        )}
        <div className="">
          <CommonComponent.Table
            loading={loading}
            columns={columns}
            data={data?.brand}
            page={filters.page}
            pageSize={filters.size}
            total={data?.total ?? 20}
            onChangePage={(page) => handleChangePage(page)}
            onChangePageSize={handlePagesize}
          />
        </div>
      </CommonComponent.ContainerBox>
    </div>
  );
};

export default DeviceManagement;
