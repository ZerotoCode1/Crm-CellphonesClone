// import Footer from "@/components/Footer";

import Header from "@/components/header";
import { iconsSvg } from "@/components/icons-svg";
import SidebarANTD from "@/components/side-bar/SlidebarAntd";
import { classCommon } from "@/constants/common";
import { useGetHeightHeader } from "@/hooks/useGetHeightHeader";
import { useStateGlobal } from "@/providers/StateGlobalProvider";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate } from "react-router-dom";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { height } = useGetHeightHeader(classCommon.header);
  const { Content } = Layout;
  const { collapsedContext } = useStateGlobal();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="component:DefaultLayout relative">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsedContext} className="layout-cutom" width={257}>
          <SidebarANTD heightHeader={height} />
        </Sider>
        <Layout style={{ height: "100vh" }}>
          <Header />
          <Content
            style={{
              padding: 24,
              minHeight: 280,
              backgroundColor: "#fff",
              overflow: "auto",
            }}
          >
            {location.pathname === "/" ? (
              <></>
            ) : (
              <div className="mb-2" onClick={() => navigate(-1)}>
                <iconsSvg.BackPage className=" cursor-pointer" />
              </div>
            )}
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DefaultLayout;
