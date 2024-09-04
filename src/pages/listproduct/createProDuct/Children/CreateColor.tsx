"use client";
import { CommonComponent } from "@/components/common-component";
import Label from "@/components/common-component/form/label";
import httpServices from "@/services/httpServices";
import { CloseOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";
import { useState } from "react";
export type Color = {
  name: string;
  image: any;
  nameImage: string;
};
interface Props {
  color: Color[];
  setColor: Function;
  setVersion: Function;
}
const CreateColor = (props: Props) => {
  const { color, setColor, setVersion } = props;
  const [nameColor, setNameColor] = useState<string>("");
  const handleAddColor = () => {
    if (!nameColor) return;
    setColor((pre: any) => [...pre, { name: nameColor }]);
    setNameColor("");
  };

  const onUploadChange = async (fileList: any, name: string) => {
    const formData = new FormData();
    formData.append("image", fileList[0].originFileObj);
    try {
      const res = await httpServices.post("/upLoadImage", formData);
      if (res.data) {
        setColor((pre: any) => pre.map((item: any) => (item.name === name ? { ...item, image: res.data.url, nameImage: res.data.name } : item)));
      }
    } catch (error) {}
  };
  const onRemoveImage = (name: string) => {
    setColor((pre: any) => pre.map((item: any) => (item.name === name ? { ...item, image: "" } : item)));
  };
  const onRemoveColor = (name: string) => {
    setColor((pre: any) => pre.filter((item: any) => item.name !== name));
    setVersion((pre: any) =>
      pre.map((item: any) => ({
        ...item,
        color: item.color.filter((color: any) => color !== name),
        quannity: item.quannity.filter((color: any) => color !== name),
      }))
    );
  };
  return (
    <div>
      <div className="flex items-center ">
        <Label title="Tên màu" className="mr-6" />
        <CommonComponent.Input
          value={nameColor}
          onChange={(e) => setNameColor(e.target.value)}
          placeholder="Nhập tên màu"
          style={{ width: "200px" }}
        />
        <p onClick={handleAddColor} className="bg-[#872f2f]">
          Thêm màu
        </p>
      </div>
      <div className="mt-5 gap-y-4">
        {color.map((item) => (
          <>
            <div className="flex items-center mb-[10px]" key={item.name}>
              <div className="w-[5%] h-full items-center flex">
                <Label title={`${item.name}: `} />
              </div>
              <div className="min-w-[100px]">
                <Upload fileList={[]} onChange={(e) => onUploadChange(e.fileList, item?.name)}>
                  {item?.image ? (
                    <div style={{ position: "relative", display: "inline-block" }}>
                      <Image src={item?.image} alt="" width={80} height={80} />
                    </div>
                  ) : (
                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                  )}
                </Upload>
              </div>
              <div className="pl-4 gap-2 flex">
                {item?.image && <Button icon={<DeleteOutlined />} onClick={() => onRemoveImage(item?.name)} />}
                <Button icon={<CloseOutlined />} onClick={() => onRemoveColor(item?.name)} />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default CreateColor;
