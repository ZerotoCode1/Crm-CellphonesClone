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

type FieldType = {
  customerName?: string;
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
  id: number;
}
const ManagementOrderInformationEsim = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchParams, setSearchParams] = useState<SEARCH_PARAMS>();
  const location = useLocation();

  const params = queryString.parse(location.search);

  const { filters, handleChangePage, handleAddParams, handlePagesize } = useFiltersHandler({
    page: params?.page ? Number(params?.page) - 1 : 0,
    size: params?.size ? Number(params?.size) : 10,
  });
  const { data } = useGetListOrderEsim(filters, cachedKeys.listOrderEsim);

  const [form] = Form.useForm();
  const values = form.getFieldsValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search) {
      const searchs = queryString.parse(location.search);
      setSearchParams({ id: Number(searchs.id) });
    } else {
      //@ts-ignore
      setSearchParams(null);
    }
  }, [location]);

  const columns: TableColumnsType<DataType> = [
    {
      title: fieldsTable.customerName.label,
      dataIndex: fieldsTable.customerName.fieldName,
      width: 150,
      align: "center",
      sorter: (a: any, b: any) => a.customerName.localeCompare(b.customerName),
      render: (value: string) => {
        return (
          <div className=" truncate">
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          </div>
        );
      },
    },

    {
      title: fieldsTable.customerEmail.label,
      dataIndex: fieldsTable.customerEmail.fieldName,
      width: 150,
      align: "center",
      sorter: (a: any, b: any) => a.customerEmail.localeCompare(b.customerEmail),
      render: (value: string) => {
        return (
          <div className=" truncate">
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          </div>
        );
      },
    },

    {
      title: fieldsTable.orderCodeSkyfi.label,
      dataIndex: fieldsTable.orderCodeSkyfi.fieldName,
      width: 150,
      align: "center",
      render: (value: string) => {
        return (
          <div className=" truncate">
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          </div>
        );
      },
    },

    {
      title: fieldsTable.orderCodeVja2.label,
      dataIndex: fieldsTable.orderCodeVja2.fieldName,
      width: 120,
      align: "center",
      render: (value: string) => {
        return (
          <div className=" truncate">
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: fieldsTable.orderCodeAiralo.label,
      dataIndex: fieldsTable.orderCodeAiralo.fieldName,
      width: 150,
      align: "center",
      render: (value: string) => {
        return (
          <div className=" truncate">
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Mã gói cước Airalo",
      dataIndex: "packageId",
      width: 150,
      align: "center",
      render: (value: string) => {
        return (
          <div className=" truncate">
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: fieldsTable.countryCode.label,
      dataIndex: fieldsTable.countryCode.fieldName,
      width: 100,
      align: "center",
      render: (value: string) => {
        return (
          <div className=" truncate">
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          </div>
        );
      },
    },

    {
      title: fieldsTable.departureCode.label,
      dataIndex: fieldsTable.departureCode.fieldName,
      width: 100,
      align: "center",
      render: (value: string) => {
        return (
          <div className=" truncate">
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: fieldsTable.destinationCode.label,
      dataIndex: fieldsTable.destinationCode.fieldName,
      width: 100,
      align: "center",
      render: (value: string) => {
        return (
          <div className=" truncate">
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          </div>
        );
      },
    },

    {
      title: fieldsTable.price.label,
      dataIndex: fieldsTable.price.fieldName,
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
      title: fieldsTable.quantity.label,
      dataIndex: fieldsTable.quantity.fieldName,
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
      title: fieldsTable.appCode.label,
      dataIndex: fieldsTable.appCode.fieldName,
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
      title: fieldsTable.createTime.label,
      dataIndex: fieldsTable.createTime.fieldName,
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
      title: fieldsTable.orderStatus.label,
      dataIndex: fieldsTable.orderStatus.fieldName,
      width: 200,
      align: "center",
      render: (status: STATUS) => {
        if (status === STATUS.fail) {
          return (
            <Tag color="#EC5656" className="tag-antd">
              Chưa đặt hàng
            </Tag>
          );
        } else if (status === STATUS.success) {
          return (
            <Tag color="#29CC97" className="tag-antd">
              Đã đặt
            </Tag>
          );
        } else {
          return (
            <Tag color="#fa9507" className="tag-antd">
              Từ chối đơn hàng
            </Tag>
          );
        }
      },
    },
    {
      title: "Trạng thái thanh toán ",
      dataIndex: "paymentStatus",
      width: 200,
      align: "center",
      render: (status: STATUS) => {
        if (status === 0) {
          return (
            <Tag color="#EC5656" className="tag-antd">
              Chưa thanh toán
            </Tag>
          );
        } else if (status === 1) {
          return (
            <Tag color="#29CC97" className="tag-antd">
              Đã thanh toán
            </Tag>
          );
        } else {
          return (
            <Tag color="#fa9507" className="tag-antd">
              Từ chối đơn hàng
            </Tag>
          );
        }
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
            <iconsSvg.Eye onClick={() => navigate(`${location.pathname}?id=${record?.id}`)} />
          </div>
        );
      },
    },
  ];

  const numberRow = 5;

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const body = {
      customerName: values?.customerName ? values?.customerName.trim() : "",
      customerEmail: values?.customerEmail ? values?.customerEmail.trim() : "",
      orderCodeSkyfi: values?.orderCodeSkyfi ? values?.orderCodeSkyfi.trim() : "",
      orderCodeThirdParty: values?.orderCodeThirdParty ? values?.orderCodeThirdParty.trim() : "",
      countryCode: values?.countryCode ? values?.countryCode.trim() : "",
      departureCode: values?.departureCode ? values?.departureCode.trim() : "",
      destinationCode: values?.destinationCode ? values?.destinationCode.trim() : "",
      orderCodeAiralo: values?.orderCodeAiralo ? values?.orderCodeAiralo.trim() : "",
      //no trim
      page: 0,
      appCode: values?.appCode ?? "",
      startTime: values?.startTime ? dayjs(values.startTime).format(DATE_FORMAT_V2_START) : null,
      endTime: values.endTime ? dayjs(values.endTime).format(DATE_FORMAT_V2_END) : null,
    };
    handleAddParams(body);
  };

  const onClearForm = () => {
    const convertData: any = {};
    Object.keys(values).forEach((item) => {
      convertData[item] = "";
    });
    const newData = {
      ...convertData,
      page: 0,
      startTime: null,
      endTime: null,
    };
    form.setFieldsValue(newData);
    onFinish(newData);
  };

  const onExportOrder = async () => {
    const values = form.getFieldsValue();
    const body = {
      ...requestBaseApi({ wsCode: WS_CODE.EXPORT_ORDER_ESIM }),
      wsRequest: {
        ...values,
        startTime: values?.startTime ? moment(values.startTime).format(DATE_FORMAT_V2_START) : null,
        endTime: values?.endTime ? moment(values.endTime).format(DATE_FORMAT_V2_END) : null,
        page: filters.page,
        size: filters.size,
      },
    };
    try {
      LoadingPageService.instance.current.open();
      const res = await FileServices.exportOrderEsim(body);
      exportFileBase64(res.data.result.wsResponse.file, "list-order");
    } catch {
    } finally {
      LoadingPageService.instance.current.close();
    }
  };

  return (
    <div>
      {searchParams?.id ? (
        <>
          <DetailOrderEsim id={searchParams?.id} />
        </>
      ) : (
        <>
          <h2 className="title-page mb-10">Tất cả đơn hàng eSim</h2>
          <ContainerBox>
            <Form form={form} onFinish={onFinish}>
              <div className="flex items-end gap-x-2">
                {filtersSearch.map((item, index) => {
                  return (
                    <div className="w-[calc(100%/5-8px)]">
                      <Form.Item key={index} name={item.name}>
                        <CommonComponent.Input title={item.label} placeholder={item.label} />
                      </Form.Item>
                    </div>
                  );
                })}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </div>

              <div style={isOpenSearch ? { ...openSearchExtend } : { ...closeSearchExtend }}>
                <div className="flex flex-wrap">
                  <div className="w-[calc(100%/5-8px)] mr-2">
                    <Label title={fieldsTable.appCode.label} />
                    <Form.Item name={fieldsTable.appCode.fieldName}>
                      <CommonComponent.SelectNoForm options={optionsAppCode} placeholder={fieldsTable.appCode.label} />
                    </Form.Item>
                  </div>
                  {filtersSearchMore.map((item, index) => {
                    return (
                      <div className={`w-[calc(100%/5-8px)] mr-2`} style={(index + 1) % numberRow === 0 ? { marginRight: "0" } : {}}>
                        <Form.Item key={index} name={item.name}>
                          <CommonComponent.Input title={item.label} placeholder={item.label} />
                        </Form.Item>
                      </div>
                    );
                  })}
                  <div className={`w-[calc(100%/5-8px)] mr-2`}>
                    <Form.Item name={"startTime"}>
                      <CommonComponent.DatePicker title={"Ngày bắt đầu"} placeholder={"Ngày bắt đầu"} />
                    </Form.Item>
                  </div>
                  <div className={`w-[calc(100%/5-8px)]`}>
                    <Form.Item name={"endTime"}>
                      <CommonComponent.DatePicker title={"Ngày kết thúc"} placeholder={"Ngày kết thúc"} />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="flex item-center mb-2">
                <div className="flex items-center" onClick={() => setIsOpenSearch(!isOpenSearch)}>
                  <div style={{ cursor: "pointer", fontWeight: 600 }}>Tìm kiếm thêm</div>
                  <iconsSvg.ChevronDown
                    style={
                      !isOpenSearch
                        ? { transform: "rotate(0deg)", transition: "all 0.5s" }
                        : {
                            transform: "rotate(180deg)",
                            transition: "all 0.5s",
                          }
                    }
                  />
                </div>
                <div onClick={onClearForm} style={{ cursor: "pointer" }} className="border border-border py-1 px-1 rounded-[4px] ml-4">
                  Clear data
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex w-fit gap-x-2">
                  {CheckRoleAction([PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS]) && (
                    <CommonComponent.ExportButton onClick={onExportOrder} />
                  )}
                  {CheckRoleAction([PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SALEOPS]) && (
                    <CommonComponent.ImportButton type={"primary"} onClick={() => navigate(BaseRoute.ImportFile)} />
                  )}
                </div>
              </div>
            </Form>
            <div className="mt-6 w-full">
              <CommonComponent.Table
                columns={columns}
                data={data?.orderCRMResList}
                page={filters.page}
                pageSize={filters.size}
                total={data?.total ?? 20}
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

const filtersSearch = [
  {
    label: fieldsTable.customerName.label,
    name: fieldsTable.customerName.fieldName,
  },
  {
    label: fieldsTable.customerEmail.label,
    name: fieldsTable.customerEmail.fieldName,
  },
  {
    label: fieldsTable.orderCodeVja2.label,
    name: fieldsTable.orderCodeVja2.fieldName,
  },
  {
    label: fieldsTable.orderCodeSkyfi.label,
    name: "orderCodeSkyfi",
  },
];

const filtersSearchMore = [
  // {
  //   label: fieldsTable.appCode.label,
  //   name: fieldsTable.appCode.fieldName,
  // },
  {
    label: fieldsTable.countryCode.label,
    name: fieldsTable.countryCode.fieldName,
  },
  {
    label: fieldsTable.departureCode.label,
    name: fieldsTable.departureCode.fieldName,
  },
  {
    label: fieldsTable.destinationCode.label,
    name: fieldsTable.destinationCode.fieldName,
  },
  {
    label: fieldsTable.orderCodeAiralo.label,
    name: fieldsTable.orderCodeAiralo.fieldName,
  },
];

const closeSearchExtend = {
  overflow: "hidden",
  maxHeight: "0",
  transition: "all 0.5s",
};

const openSearchExtend = {
  ...closeSearchExtend,
  maxHeight: "1000px",
};
