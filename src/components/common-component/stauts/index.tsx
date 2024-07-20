import { STATUS } from "@/interfaces/enum";
import { Tag } from "antd";

interface Props {
  status: STATUS;
}

const RenderStatus = (props: Props) => {
  const { status } = props;
  const checkStatus = () => {
    switch (status) {
      case 1: {
        return (
          <Tag color="#29CC97" className="tag-antd">
            Hoạt động
          </Tag>
        );
      }
      case 2: {
        return (
          <Tag color="#EC5656" className="tag-antd">
            Đã Khóa
          </Tag>
        );
      }
      default: {
        return "";
      }
    }
  };

  return <div>{checkStatus()}</div>;
};

export default RenderStatus;
