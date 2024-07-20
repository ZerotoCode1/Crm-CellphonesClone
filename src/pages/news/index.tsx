import { CommonComponent } from "@/components/common-component";
import useFiltersHandler from "@/hooks/useFilters";
import queryString from "query-string";
import dayjs from "dayjs";
import cachedKeys from "@/constants/cachedKeys";
import { DATE_FORMAT_CLIENT, DATE_FORMAT_V2_END, DATE_FORMAT_V2_START } from "@/helpers/date";
import useGetListAppCode from "@/hooks/api/news/useGetListAppCode";
import useGetListNews from "@/hooks/api/news/useGetListNews";
import { Form, FormProps, Image, Modal } from "antd";
import { iconsSvg } from "@/components/icons-svg";
import { toast } from "react-toastify";
import newsService from "@/services/news/news.service";
import { requestBaseApi } from "@/helpers/common";
import { WS_CODE } from "@/constants/apiUrl";
import { SUCCESS } from "@/constants/common";
import { useNavigate } from "react-router-dom";
import { BaseRoute, RouterDynamic } from "@/constants/baseRoute";
import { CheckRoleAction } from "@/helpers/function";
import { PERMISSION_ENUM } from "@/interfaces/enum";
type FieldType = {
  startTime: any;
  endTime: any;
  isHidden: number;
  popular: number;
  title: string;
};

const News = () => {
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const params = queryString.parse(location.search);
  let currentDate = dayjs();
  let initialEndDate = dayjs().subtract(1, "month").startOf("month");
  const navigate = useNavigate();
  const defaultPrams = {
    page: params?.page ? Number(params?.page) - 1 : 0,
    size: params?.size ? Number(params?.size) : 10,
    startTime: dayjs(initialEndDate).format(DATE_FORMAT_V2_START),
    endTime: dayjs(currentDate).format(DATE_FORMAT_V2_END),
  };
  const {
    filters,
    handleChangePage,
    handleAddParams,
    handlePagesize,
    // handleFirstPage,
  } = useFiltersHandler(defaultPrams);
  const { data, loading } = useGetListNews(filters, cachedKeys.listNews);
  const { dataAppCode } = useGetListAppCode();

  const handleDeleteNews = async (id: number) => {
    confirm({
      icon: <iconsSvg.Circle />,
      content: <div>Bạn có chắc muốn xóa bài viết không ?</div>,
      async onOk() {
        const body = {
          ...requestBaseApi({ wsCode: WS_CODE.DELETENEWS }),
          wsRequest: { newsId: id },
        };

        const res = await newsService.deleteNews(body);
        if (res?.data.result.errorCode === SUCCESS) {
          toast.success("Xóa bài viết thành công");
          const valueFilter: FieldType = form.getFieldsValue();
          handleAddParams({
            ...valueFilter,
            startTime: dayjs(valueFilter.startTime).format(DATE_FORMAT_V2_START),
            endTime: dayjs(valueFilter.endTime).format(DATE_FORMAT_V2_END),
          });
        } else {
          toast.error("Xóa bài viết thất bại , vui lòng thử lại sau");
        }
      },
      onCancel() {},
    });
  };
  const columns: any = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      align: "center",
      width: 200,
    },
    {
      title: "Ảnh ",
      dataIndex: "image",

      align: "center",
      width: 200,
      render: (image: string) => (
        <Image
          style={{
            height: "100px",
          }}
          src={image}
        ></Image>
      ),
    },
    {
      title: "Phổ biến",
      dataIndex: "popular",

      align: "center",
      width: 200,
      render: (popular: number) => <div>{popular === 1 ? "Phổ biến" : "Không phổ biến"}</div>,
    },
    {
      title: "Trạng thái hiện thị",
      dataIndex: "isHidden",

      align: "center",
      width: 200,
      render: (isHidden: boolean) => <div>{isHidden ? "Không hiển thị" : "Hiển thị"}</div>,
    },
    {
      title: "Thời gian tạo",
      dataIndex: "date",

      align: "center",
      width: 200,
    },

    {
      title: "Thời gian cập nhật",
      dataIndex: "updateTime",

      align: "center",
      width: 200,
    },
    {
      title: "Web được hiển thị ",
      dataIndex: "appCode",

      align: "center",
      width: 200,
    },
    {
      fixed: "right",
      title: "Thao tác",
      dataIndex: "newsId",
      align: "center",
      width: 100,
      render: (id: any, _record: any) => (
        <div className="flex justify-center gap-3  items-center">
          <div>
            <iconsSvg.Edit onClick={() => navigate(`${RouterDynamic.NewsDetail}/${id}`)} />
          </div>
          <div onClick={() => handleDeleteNews(id)}>
            <iconsSvg.Delete />
          </div>
        </div>
      ),
    },
  ];

  const initialValues = {
    startTime: dayjs(initialEndDate, DATE_FORMAT_CLIENT),
    endTime: dayjs(currentDate, DATE_FORMAT_CLIENT),
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const body = {
      ...values,
      isHidden: values.isHidden === 1 ? false : values.isHidden === 2 ? true : null,
      page: 0,
      startTime: dayjs(values.startTime).format(DATE_FORMAT_V2_START),
      endTime: dayjs(values.endTime).format(DATE_FORMAT_V2_END),
    };

    handleAddParams(body);
  };
  const handleResetFilter = () => {
    form.resetFields();
    handleAddParams(defaultPrams);
  };

  return (
    <div>
      <CommonComponent.ContainerBox>
        <h2 className="title-page">Quản lý tin tức</h2>
        <div className="flex justify-between">
          <Form form={form} onFinish={onFinish} layout="inline" initialValues={initialValues} className="mb-5 flex gap-y-5">
            <Form.Item name={"Title"}>
              <CommonComponent.Input placeholder={"Tìm kiếm tiêu đề"} />
            </Form.Item>
            <Form.Item name={"startTime"}>
              <CommonComponent.DatePicker placeholder={"Ngày bắt đầu"} />
            </Form.Item>
            <Form.Item name={"endTime"}>
              <CommonComponent.DatePicker placeholder={"Ngày kết thúc"} />
            </Form.Item>
            <Form.Item name={"isHidden"}>
              <CommonComponent.Select options={optionStatus} placeholder={"Trạng thái"} style={{ width: "150px" }} />
            </Form.Item>
            <Form.Item name={"popular"}>
              <CommonComponent.Select options={optionPopular} placeholder={"Phổ biến"} style={{ width: "150px" }} />
            </Form.Item>
            <Form.Item name={"appCode"}>
              <CommonComponent.Select
                options={[
                  {
                    label: "Tất cả",
                    value: "",
                  },
                  ...dataAppCode,
                ]}
                placeholder={"Web hiển thị"}
                style={{ width: "150px" }}
              />
            </Form.Item>

            <Form.Item>
              <CommonComponent.Button icon={<iconsSvg.IconFilter />} onClick={handleResetFilter} className="btn-rdu" size="large">
                Xóa bộ lọc
              </CommonComponent.Button>
            </Form.Item>
            <Form.Item>
              <CommonComponent.Button className="btn-rdu" size="large" type="primary" htmlType="submit" icon={<iconsSvg.Search fill="#fff" />}>
                Tìm kiếm
              </CommonComponent.Button>
            </Form.Item>
          </Form>
          <div>
            {CheckRoleAction([PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SALEOPS]) && (
              <CommonComponent.Button
                className="btn-rdu"
                size="large"
                type="primary"
                htmlType="submit"
                icon={<iconsSvg.Create fill="#fff" />}
                onClick={() => navigate(`${BaseRoute.CreateNews}`)}
              >
                Tạo mới
              </CommonComponent.Button>
            )}
          </div>
        </div>
        <div className="">
          <CommonComponent.Table
            loading={loading}
            columns={columns}
            data={data?.result}
            page={filters.page}
            pageSize={filters.pageSize}
            total={data?.total ?? 20}
            onChangePage={(page) => handleChangePage(page)}
            onChangePageSize={handlePagesize}
          />
        </div>
      </CommonComponent.ContainerBox>
    </div>
  );
};
const optionStatus = [
  {
    label: "Tất cả",
    value: "",
  },
  {
    label: "Hiển thị",
    value: 1,
  },
  {
    label: "Không hiển thị",
    value: 2,
  },
];
const optionPopular = [
  {
    label: "Tất cả",
    value: -1,
  },
  {
    label: "Phổ biến",
    value: 1,
  },
  {
    label: "Không phổ biến",
    value: 0,
  },
];
export default News;
