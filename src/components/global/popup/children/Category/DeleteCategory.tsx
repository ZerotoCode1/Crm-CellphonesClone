import { CommonComponent } from "@/components/common-component";
import LoadingPageService from "@/services/loadingPage";
import PopupService from "@/services/popupPage";
import CategoryServices from "@/services/package/package.service";

import { toast } from "react-toastify";
interface Props {
  id: string;
  imageName: string;
}
const DeleteCategory = (prop: Props) => {
  const { id, imageName } = prop;
  const onCancel = () => {
    PopupService.instance.current.close();
  };
  const handleDelete = async () => {
    try {
      LoadingPageService.instance.current.open();
      const body = {
        _id: id,
        imageName: imageName,
      };
      //@ts-ignore
      const res = await CategoryServices.deleteCategory(body);
      toast.success("Xoá danh mục thành công!");
    } catch {
      toast.error("Xoá danh mục thất bại!");
    } finally {
      PopupService.instance.current.close();
      LoadingPageService.instance.current.close();
    }
  };
  return (
    <div>
      <div className="flex justify-center gap-x-2">
        <CommonComponent.Button onClick={onCancel} style={{ padding: "12px 30px" }}>
          Huỷ
        </CommonComponent.Button>
        <CommonComponent.Button htmlType="submit" type={"primary"} style={{ padding: "12px 40px" }} onClick={handleDelete}>
          Xác nhận xoá
        </CommonComponent.Button>
      </div>
    </div>
  );
};

export default DeleteCategory;
