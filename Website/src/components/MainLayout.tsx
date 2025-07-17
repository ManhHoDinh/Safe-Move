import { CSSProperties } from "react";
import { Colors } from "../utils/colors";
import { useGlobalContext } from "../utils/globalContext";
import { Header } from "./Header";
import { Sidebar } from "./SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {title} = useGlobalContext()
  return (
    <div style={containerStyle}>
      <Sidebar style={sideBarStyle} />
      <div style={contentStyle}>
        <Header style={headerStyle} title={title} />
        <div style={mainStyle}>{children}</div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  backgroundColor: Colors.backgroundColor,
  height: "100%",
};

const sideBarStyle: CSSProperties = {
  width: "20vw",
  minWidth: 250,
  color: "white",
  backgroundColor: Colors.white,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
};

const mainStyle: React.CSSProperties = {
  backgroundColor: Colors.white,
  flex: 1,
  borderWidth: 1,
  borderRadius: 10,
  padding: "10px 20px 10px 20px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  overflow: "scroll",
  overflowX: "hidden",
};

const headerStyle: React.CSSProperties = {
  height: "5%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "30px 50px",
  width: "100%",
};

export default Layout;
