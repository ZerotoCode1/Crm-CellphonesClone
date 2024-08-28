import type { GetRef, InputRef } from "antd";
import { AutoComplete, Button, Checkbox, Form, Input, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  technical: string;
  describe: string;
  address: boolean;
}
interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

export interface DataType {
  key: React.Key;
  technical: string;
  describe: string;
  representative: boolean;
  topic: string;
}
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
interface Props {
  dataSource: DataType[];
  setDataSource: Function;
  parameter?: [];
  keyVersion?: string;
}
const Editable = (props: Props) => {
  const { dataSource, setDataSource, parameter, keyVersion } = props;

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAddHightLight = (e: boolean, key: number) => {
    const data = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, representative: e };
      }
      return item;
    });
    setDataSource(data);
  };
  const handleAddTopic = (e: string, key: number) => {
    const data = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, topic: e };
      }
      return item;
    });
    setDataSource(data);
  };
  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: "Thông số kỹ thuật",
      dataIndex: "technical",
      width: "300px",
      editable: true,
    },
    {
      title: "Mô tả ",
      dataIndex: "describe",
      editable: true,
      width: "40%",
    },
    {
      title: "Chủ đề",
      dataIndex: "topic",
      render: (_, record) => (
        <AutoComplete
          value={record.topic}
          style={{ width: 200 }}
          options={parameter ?? options}
          onChange={(e) => handleAddTopic(e, record.key)}
          placeholder="Chọn chủ đề"
          filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        />
      ),
    },
    {
      title: "Thông số tiêu biểu",
      align: "center",
      width: "100px",
      dataIndex: "representative",
      render: (_, record) => (
        <>
          <div>
            <Checkbox onChange={(e) => handleAddHightLight(e.target.checked, record.key)} checked={record.representative} />
          </div>
        </>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      width: "100px",
      align: "center",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Bạn có chắc muốn xoá ?" onConfirm={() => handleDelete(record.key)}>
            <a>Xoá</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: `${count}-${keyVersion}`,
      technical: "Thống số mới",
      describe: "mô tả thông số",
      topic: "chủ đề",
      representative: false,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16, height: "45px" }}>
        Thêm mới thông số kỹ thuật
      </Button>
      <Table components={components} rowClassName={() => "editable-row"} bordered dataSource={dataSource} columns={columns as ColumnTypes} />
    </div>
  );
};

export default Editable;
const options = [{ value: "Vi xử lý & đồ họa" }, { value: "RAM & Ổ cứng" }, { value: "Thông số khác" }, { value: "Màn hình" }];
