import { CommonComponent } from "@/components/common-component";
import ContainerBox from "@/components/common-component/ContainerBox";
import { WS_CODE } from "@/constants/apiUrl";
import cachedKeys from "@/constants/cachedKeys";
import { fieldsTable } from "@/constants/fieldsTable";
import { exportFileBase64, requestBaseApi } from "@/helpers/common";
import { DATE_FORMAT_V2_END, DATE_FORMAT_V2_START } from "@/helpers/date";
import useGetListEsimSold from "@/hooks/api/order-esim/useGetListEsimSold";
import useFiltersHandler from "@/hooks/useFilters";
import FileServices from "@/services/file/file.service";
import LoadingPageService from "@/services/loadingPage";
import type { FormProps } from "antd";
import { Button, Form, Tooltip } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { iconsSvg } from "../../components/icons-svg/index";
import DetailOrderEsimSold from "./detail";
import Label from "@/components/common-component/form/label";
import { optionsAppCode } from "@/mocks";
import { CheckRoleAction } from "@/helpers/function";
import { PERMISSION_ENUM } from "@/interfaces/enum";
import useGetListProduct from "@/hooks/api/Product/useGetListProDuct";

// interface DataType {
//   customerName: React.Key;
//   customerEmail: string;
//   orderCodeSkyfi: number;
//   address: string;
//   orderCodeVja2: string;
//   countryCode: string;
//   departureCode: string;
//   destinationCode: string;
//   price: string;
//   quantity: string;
//   appCode: string;
//   createTime: string;
//   orderStatus: string;
//   paymentStatus: string;
// }

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
  id: string;
}
const ListEsimSold = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchParams, setSearchParams] = useState<SEARCH_PARAMS>();

  const location = useLocation();

  const params = queryString.parse(location.search);

  const { filters, handleChangePage, handleAddParams, handlePagesize } = useFiltersHandler({
    // page: params?.page ? Number(params?.page) - 1 : 0,
    limit: params?.size ? Number(params?.size) : 10,
  });
  const { data } = useGetListProduct(filters, cachedKeys.listProduct);
  const [form] = Form.useForm();
  const values = form.getFieldsValue();
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
          <Tooltip placement="topLeft" title={value}>
            <img src={value} height={40} width={40} />
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
        <div className="flex justify-center">
          <iconsSvg.Eye onClick={() => navigate(`${location.pathname}?id=${record?.iccid}`)} />
        </div>
      ),
    },
  ];

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
    console.log("Success:", values);
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
      ...requestBaseApi({ wsCode: WS_CODE.EXPORT_ORDER_ESIM_SOLD }),
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
      exportFileBase64(res.data.result.wsResponse.file, "Danh sách đơn hàng");
    } catch {
    } finally {
      LoadingPageService.instance.current.close();
    }
  };

  return (
    <div>
      <h2 className="title-page">{searchParams?.id ? "Chi tiết Esim" : "Danh sách esim đã bán"}</h2>
      {searchParams?.id ? (
        <>
          <DetailOrderEsimSold id={searchParams?.id} />
        </>
      ) : (
        <>
          <ContainerBox>
            {/* <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                </div>
              </div>
            </Form> */}
            <div className="mt-6">
              <CommonComponent.Table
                columns={columns}
                data={data?.data ?? []}
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

export default ListEsimSold;

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
