import { Table as TableAndt, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import "@/style/table.css";

interface Props extends TableProps {
  columns: ColumnsType<any>;
  data: any;
  total: number;
  pageSize: number;
  page: number;
  onChangePage?: (page: number, pageSize: number) => void;
  onChangePageSize?: (page: number, pageSize: number) => void;
  loading?: boolean;
}

const Table = (props: Props) => {
  const { columns, data, total, pageSize, page, onChangePage, onChangePageSize, loading = false, ...params } = props;

  const convertColumns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "stt",
      fixed: "left",
      align: "center",
      width: 80,
      render: (_, __, i) => {
        if (page !== 0) {
          return page * pageSize + i + 1;
        } else {
          return i + 1;
        }
      },
    },
    ...columns,
  ];
  return (
    <div>
      <TableAndt
        className=" w-full"
        loading={loading}
        columns={convertColumns}
        dataSource={data}
        scroll={{ x: 1200 }}
        pagination={{
          total: total,
          current: page + 1,
          pageSize: pageSize ?? 10,
          onChange: onChangePage,
          onShowSizeChange: onChangePageSize,
          pageSizeOptions: [10, 20, 50],
        }}
        {...params}
      />
    </div>
  );
};

export default Table;
