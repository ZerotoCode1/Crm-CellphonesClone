import { CommonComponent } from "@/components/common-component";
import Label from "@/components/common-component/form/label";
import httpServices from "@/services/httpServices";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useState } from "react";
interface Props {
  image: any;
  setImage: Function;
  versionColor: any;
  setVersionColor: Function;
  color: string[];
  setColor: Function;
}
const CreateColor = (props: Props) => {
  const { image, setImage, versionColor, setVersionColor, color, setColor } = props;
  console.log(image, "image");
  const [nameColor, setNameColor] = useState<string>("");
  const handleAddColor = () => {
    if (!nameColor) return;
    setColor([...color, nameColor]);
    setNameColor("");
  };

  const onUploadChange = async (fileList: any, name: string) => {
    setImage({ [name]: fileList });
    const formData = new FormData();
    formData.append("image", fileList[0].originFileObj);
    try {
      const res = await httpServices.post("/upLoadImage", formData);
      if (res.data) {
        setVersionColor([...versionColor, { name, image: res.data.url, nameImage: res.data.name }]);
      }
    } catch (error) {}
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
            <div className="flex items-center mb-[10px]">
              <div className="w-[10%] h-full items-center flex">
                <Label title={`${item}: `} />
              </div>
              <Upload fileList={image[item] || []} onChange={(e) => onUploadChange(e.fileList, item)} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
              </Upload>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default CreateColor;
