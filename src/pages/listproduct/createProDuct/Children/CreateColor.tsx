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
  const [nameColor, setNameColor] = useState<string>("");
  const handleAddColor = () => {
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
      <div className="flex">
        <CommonComponent.Input
          value={nameColor}
          onChange={(e) => setNameColor(e.target.value)}
          title={"Tên màu"}
          placeholder="Nhập tên màu"
          style={{ width: "200px" }}
        />
        <button onClick={handleAddColor} className="bg-[#872f2f]">
          Thêm màu
        </button>
      </div>
      <div>
        {color.map((item) => (
          <>
            <div className="flex gap-4">
              <Label title={item} />
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
