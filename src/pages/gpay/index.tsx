import { CommonComponent } from "@/components/common-component";
import cachedKeys from "@/constants/cachedKeys";
import useGetListControl from "@/hooks/api/control/useGetListControl";
import useFiltersHandler from "@/hooks/useFilters";
import queryString from "query-string";

const Gpay = () => {
  const params = queryString.parse(location.search);

  const { filters, handleChangePage, handlePagesize } = useFiltersHandler({
    page: params?.page ? Number(params?.page) - 1 : 0,
    size: params?.size ? Number(params?.size) : 10,
  });
  const { data } = useGetListControl(filters, cachedKeys.gpay);

  const columns: any = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      width: 120,
      align: "center",
    },
    {
      title: "Url",
      dataIndex: "url",
      width: 200,
      align: "center",
    },
    {
      title: "Request",
      dataIndex: "request",
      width: 300,
      align: "center",
      render: (request: any) => {
        const convertRequest = (request && JSON.parse(request)) || {};

        const { orderID, orderAmount, language, orderDescription, successURL } = convertRequest?.requestData;

        return (
          <>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "start" }}>
              <p>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>requestID: </span>
                {convertRequest?.requestID}
              </p>
              <p>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>orderID: </span>
                {orderID ?? ""}
              </p>
              <p>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>orderAmount: </span>
                {orderAmount}
              </p>
              <p>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>language: </span>
                {language}
              </p>
              <p>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>orderDescription: </span>
                {orderDescription}
              </p>
              <p>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>successURL: </span>
                {successURL}
              </p>
            </div>
          </>
        );
      },
    },
    {
      title: "Response",
      dataIndex: "response",
      width: 300,
      align: "center",
      render: (response: any) => {
        const convertResponse = (response && JSON.parse(response)) || {};

        return (
          <>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "start" }}>
              <p>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>requestID: </span>
                {convertResponse?.requestID}
              </p>
              <p>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>responseMessage: </span>
                {convertResponse?.responseMessage}
              </p>
              <p>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>endpoint: </span>
                {convertResponse?.responseData?.endpoint ?? "null"}
              </p>
              <p>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>transactionID: </span>
                {convertResponse?.responseData?.transactionID ?? "null"}
              </p>
              <p>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>qrCode: </span>
                {convertResponse?.responseData?.qrCode ?? "null"}
              </p>
            </div>
          </>
        );
      },
    },
    // {
    //   title: 'Trạng thái response',
    //   dataIndex: 'statusResponse',
    //   width: 80,
    //   align: 'center',
    // },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      width: 120,
      align: "center",
    },
  ];

  return (
    <div>
      <h2 className="title-page">{"Đối soát GPay"}</h2>
      <CommonComponent.ContainerBox>
        <div className="mt-5">
          <CommonComponent.Table
            columns={columns}
            data={data?.results}
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

export default Gpay;
