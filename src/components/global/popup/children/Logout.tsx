import { CommonComponent } from "@/components/common-component";
import { iconsSvg } from "@/components/icons-svg";
import { useAuth } from "@/providers/AuthenticationProvider";
import PopupService from "@/services/popupPage";

const Logout = () => {
  const { logout } = useAuth();
  const handleCancer = () => {
    PopupService.instance.current.close();
  };
  return (
    <div className="text-center">
      <div className="flex justify-center mb-5">
        <iconsSvg.IconWarningOutline style={{ color: "#ffcc24" }} />
      </div>
      <div className="flex justify-center gap-4">
        <CommonComponent.Button onClick={handleCancer} style={{ width: "120px", height: "48px" }}>
          Quay lại
        </CommonComponent.Button>
        <CommonComponent.Button type="primary" style={{ color: "#fff", width: "120px", height: "48px" }} onClick={logout}>
          Đăng xuất
        </CommonComponent.Button>
      </div>
    </div>
  );
};

export default Logout;
