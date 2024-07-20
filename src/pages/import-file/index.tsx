import { useState } from "react";
import { CommonComponent } from "../../components/common-component/index";
import { ROOT_URL_IMPORT, WS_CODE } from "@/constants/apiUrl";
import { iconsSvg } from "../../components/icons-svg/index";
import { exportFile, requestBaseApi } from "@/helpers/common";
import FileServices from "@/services/file/file.service";
import { toast } from "react-toastify";
import { Modal, Tooltip } from "antd";
import { fieldsTable } from "@/constants/fieldsTable";
import LoadingPageService from "@/services/loadingPage";

const ImportFile = () => {
  const [fileName, setFileName] = useState<string>("");
  const [base64, setBase64] = useState<string>("");
  const [dataResult, setDataResult] = useState<any>([]);
  const [dataPreview, setDataPreview] = useState<any>([]);
  const [fileDowload, setFileDownLoad] = useState("");
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const binaryStr = e.target.result;
        const base64String = btoa(binaryStr); // Convert to base64
        setBase64(base64String);
      };
      reader.readAsBinaryString(file);
    }
  };

  const previewceExcel = async () => {
    if (base64) {
      try {
        LoadingPageService.instance.current.open();
        const body = {
          ...requestBaseApi({ wsCode: WS_CODE.PREVIEW_ORDER }),
          wsRequest: {
            fileData: base64,
            fileName: "",
          },
        };
        const res = await FileServices.previewOrder(body);
        if (res.data.result.wsResponse) {
          setDataPreview(res.data.result.wsResponse.result);
          toast.success("Upload thành công");
          setIsModal(true);
        } else {
          toast.error("Upload thất bại!");
        }
      } catch (error) {
        toast.error("Upload thất bại!");
      } finally {
        LoadingPageService.instance.current.close();
      }
    } else {
      toast.error("File phải là bắt buộc");
    }
  };

  const importExcel = async () => {
    if (base64) {
      try {
        LoadingPageService.instance.current.open();
        const body = {
          ...requestBaseApi({ wsCode: WS_CODE.IMPORT_ORDER }),
          wsRequest: {
            fileData: base64,
            fileName: "preview_template.xlsx",
          },
        };
        const res = await FileServices.importOrder(body);

        if (res.data.result.wsResponse) {
          setDataResult(res.data.result.wsResponse.result);
          setFileDownLoad(res.data.result.wsResponse.fileUrl);
          toast.success("Upload thành công");
        } else {
          toast.error("Upload thất bại!");
        }
      } catch (error) {
        toast.error("Upload thất bại!");
      } finally {
        LoadingPageService.instance.current.close();
      }
    } else {
      toast.error("File phải là bắt buộc");
    }
  };

  return (
    <div>
      <h2 className="title-page">Nhập đơn hàng theo lô</h2>
      <div className="">
        <div className=" border-dashed border px-4 py-8 flex justify-center rounded-sm cursor-pointer" style={{ width: "100%" }}>
          {fileName ? (
            <div className="flex items-center text-[18px]">
              {fileName}
              <iconsSvg.CloseCircle
                className="ml-2"
                onClick={() => {
                  setFileName("");
                  setBase64("");
                }}
              />
            </div>
          ) : (
            <>
              <label className="text-[18px] cursor-pointer" htmlFor="file-upload">
                Chọn file cần import
              </label>
              <input
                id="file-upload"
                type="file"
                name="file-upload"
                style={{
                  display: "none",
                }}
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
            </>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <a href={ROOT_URL_IMPORT} download="template_import.xlsx">
            <CommonComponent.Button className="dlb-block button-radius btn-rdu" size="large" icon={<iconsSvg.Download />}>
              Tải xuống file mẫu
            </CommonComponent.Button>
          </a>
          <CommonComponent.Button
            type={"primary"}
            onClick={() => {
              previewceExcel();
            }}
          >
            Tải lên
          </CommonComponent.Button>
          <CommonComponent.Button
            className=""
            disabled={!fileDowload}
            size="large"
            icon={<iconsSvg.IconFile />}
            onClick={() => {
              exportFile(fileDowload);
            }}
          >
            Tải file kết quả
          </CommonComponent.Button>
        </div>
      </div>
      <div className="mt-14">
        <h4 className="text-[20px] font-bold mb-4" style={{ marginTop: "16px" }}>
          Danh sách thành công
        </h4>
        <CommonComponent.Table
          columns={columnsV2}
          data={dataResult?.success}
          pagination={false}
          page={0}
          pageSize={dataResult?.success?.length ?? 1000}
          total={dataResult?.success?.length ?? 1000}
        />
      </div>
      <div>
        <h4 className="text-[20px] font-bold mb-4" style={{ marginTop: "16px" }}>
          Danh sách thất bại
        </h4>
        <CommonComponent.Table
          columns={columnsV2}
          data={dataResult?.error}
          page={0}
          pageSize={dataResult?.error?.lenght ?? 1000}
          total={dataResult?.error?.lenght ?? 1000}
          pagination={false}
        />
      </div>
      <Modal
        width={1200}
        visible={isModal}
        onOk={() => {
          setIsModal(false);
          importExcel();
        }}
        onCancel={() => {
          setIsModal(false);
        }}
      >
        <div className="">
          <CommonComponent.Table
            columns={columns}
            data={dataPreview ?? []}
            size="middle"
            className="mt-3 table-budget"
            pagination={false}
            page={0}
            pageSize={10}
            total={dataPreview?.lenght ?? 1000}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ImportFile;

const columns: any = [
  {
    title: fieldsTable.orderCodeVja.label,
    dataIndex: fieldsTable.orderCodeVja.fieldName,
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
    title: fieldsTable.customerName.label,
    dataIndex: fieldsTable.customerName.fieldName,
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
    title: fieldsTable.customerEmail.label,
    dataIndex: "customerEmail",
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
    title: fieldsTable.customerPhone.label,
    dataIndex: fieldsTable.customerPhone.fieldName,
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
    title: fieldsTable.skyjoyMember.label,
    dataIndex: fieldsTable.skyjoyMember.fieldName,
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
    title: fieldsTable.departureCode.label,
    dataIndex: fieldsTable.departureCode.fieldName,
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
    title: fieldsTable.destinationCode.label,
    dataIndex: fieldsTable.destinationCode.fieldName,
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
    title: fieldsTable.countryCode.label,
    dataIndex: fieldsTable.countryCode.fieldName,
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
    title: fieldsTable.packageId.label,
    dataIndex: fieldsTable.packageId.fieldName,
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
    title: fieldsTable.pricePackage.label,
    dataIndex: fieldsTable.pricePackage.fieldName,
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
    title: fieldsTable.quantity.label,
    dataIndex: fieldsTable.quantity.fieldName,
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
    title: fieldsTable.price.label,
    dataIndex: fieldsTable.price.fieldName,
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
    title: "Đơn vị tiền tệ",
    dataIndex: "currency",
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
    title: "Mã ứng dụng",
    dataIndex: "appCode",
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
];

const columnsV2: any = [
  {
    title: "Mã đơn hàng VJA",
    dataIndex: "orderCode",
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
    title: "Tên khách hàng",
    dataIndex: "customerName",
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
    title: "Email khách hàng",
    dataIndex: "customerEmail",
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
    title: "Số điện thoại",
    dataIndex: "customerPhone",
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
    title: "Mã thành viên skyjoy",
    dataIndex: "skyjoyMember",
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
    title: "Giá gói cước",
    dataIndex: "price",
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
    title: "Đơn vị tiền tệ",
    dataIndex: "currency",
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
    title: "Số lượng",
    dataIndex: "quantity",
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
    title: "Kênh bán",
    dataIndex: "appCode",
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
    title: "Trạng thái",
    dataIndex: "resultImport",
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
];
