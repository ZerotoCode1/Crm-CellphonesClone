import { CommonComponent } from "@/components/common-component";
import { DataType } from "@/components/common-component/EditTableCell";
import Label from "@/components/common-component/form/label";
import { Form, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { Color } from "./CreateColor";

interface Props {
  dataDefault: DataType[];
  dataSources: [
    {
      [x: string]: any;
      id: number;
      data: any;
      nameVersion: "";
      priceVersion: "";
      color: [""];
      quannity: [{}];
    }
  ];
  setDataSources: Function;
  optionColor: Color[];
  optionParameter: [];
}
const CreateVersion = (props: Props) => {
  const { dataDefault, dataSources, setDataSources, optionColor, optionParameter } = props;
  // const [dataSources, setDataSources] = useState([{ id: 0, data: dataDefault, nameVersion: "", priceVersion: "", color: [""], priceColor: [{}] }]);

  const Option = optionColor.map((item) => {
    return {
      label: item?.name,
      value: item?.name,
    };
  });
  console.log(Option, "optionColor");

  useEffect(() => {
    setDataSources(dataSources.map((source) => ({ ...source, data: dataDefault })));
  }, [dataDefault]);

  const handleAddversion = () => {
    const newId = dataSources.length;
    setDataSources([...dataSources, { id: newId, data: dataDefault, nameVersion: "", priceVersion: "", color: [""], quannity: [] }]);
  };

  const updateDataSource = (id: number, newData: any) => {
    setDataSources(dataSources.map((source) => (source.id === id ? { ...source, data: newData } : source)));
  };
  const handleNameVersionChange = (id: number, value: string) => {
    setDataSources(dataSources.map((source) => (source.id === id ? { ...source, nameVersion: value } : source)));
  };

  const handlePriceVersionChange = (id: number, value: string) => {
    setDataSources(dataSources.map((source) => (source.id === id ? { ...source, priceVersion: value } : source)));
  };
  const handleChange = (id: number, value: string[]) => {
    setDataSources(dataSources.map((source) => (source.id === id ? { ...source, color: value } : source)));
  };
  const hendleQuanniTyColor = (id: number, value: any, key: string) => {
    setDataSources(
      dataSources.map((source) => {
        if (source.id === id) {
          let updatedPriceColor = [...source.quannity];
          const colorIndex = updatedPriceColor.findIndex((item) => key in item);

          if (colorIndex >= 0) {
            updatedPriceColor[colorIndex] = { [key]: value };
          } else {
            updatedPriceColor.push({ [key]: value });
          }
          updatedPriceColor = updatedPriceColor.filter((item) => Object.keys(item).length !== 0);

          return { ...source, quannity: updatedPriceColor };
        }
        return source;
      })
    );
  };

  return (
    <div>
      <CommonComponent.Button onClick={handleAddversion} className="my-4 bg-[#e74f4f] text-[#fff]">
        Thêm phiên bản máy
      </CommonComponent.Button>
      {dataSources.map((source, index) => {
        const id = source._id || source.id;
        const optionValues = new Set(options.map((option) => option.label));

        // Lọc defaultValue để chỉ giữ lại các giá trị có trong options
        const filteredDefaultValue = source.color.filter((value) => optionValues.has(value));
        console.log(filteredDefaultValue, "filteredDefaultValue");

        return (
          <div key={id} className="p-5 rounded-[10px] mb-4" style={{ border: "1px solid #ccc" }}>
            <div className="flex gap-4">
              <Form.Item name={`nameVersion${source.id}`}>
                <CommonComponent.Input
                  title={"Tên phiên bản"}
                  defaultValue={source.nameVersion}
                  onChange={(e) => handleNameVersionChange(source.id, e.target.value)}
                />
              </Form.Item>
              <Form.Item name={`priceVersion${source.id}`}>
                <CommonComponent.Input
                  title={"Giá"}
                  defaultValue={source.priceVersion}
                  onChange={(e) => handlePriceVersionChange(source.id, e.target.value)}
                />
              </Form.Item>
              <div>
                <Label title="Màu sắc" />
                <Select
                  mode="multiple"
                  style={{ height: 40, width: 293 }}
                  placeholder="Chọn màu sắc"
                  onChange={(value) => handleChange(source.id, value)}
                  options={Option}
                  // defaultValue={source.color}
                  value={source.color}
                  optionRender={(option) => (
                    <Space>
                      <span role="img" aria-label={option?.data?.label}>
                        {option.data.label}
                      </span>
                    </Space>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center h-12">
              {dataSources[index]?.color.map((item) => {
                return (
                  item && (
                    <CommonComponent.Input
                      key={source.id}
                      defaultValue={dataSources[index]?.quannity.find((i) => item in i)?.[item]}
                      onChange={(e) => hendleQuanniTyColor(source.id, e.target.value, item)}
                      title={`${item}:`}
                      style={{ width: "100px" }}
                    />
                  )
                );
              })}
            </div>
            <div className="mt-4">
              <CommonComponent.EditTableCell
                key={source.id}
                dataSource={source.data}
                setDataSource={(newData: DataType) => updateDataSource(source.id, newData)}
                keyVersion={Math.random().toString()}
                parameter={optionParameter}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CreateVersion;
const options = [
  {
    label: "Vàng",
    value: "vàng",
  },
  {
    label: "Trắng",
    value: "trắng",
  },
  {
    label: "Hồng",
    value: "hồng",
  },
  {
    label: "Xanh",
    value: "xanh",
  },
];
