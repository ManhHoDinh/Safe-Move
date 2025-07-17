import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Dropdown, Menu, Modal } from "antd";
import React, { useState } from "react";
import { Size } from "../utils/size";
import { Colors } from "../utils/colors";
import { useGlobalContext } from "../utils/globalContext";
import { useNavigate } from "react-router-dom";

export const Header = ({
  style,
  title,
}: {
  style?: React.CSSProperties;
  title: string;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setIsAuthenticated } = useGlobalContext();
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsModalVisible(false);
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={showModal} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBorderRadius: 0,
            rowSelectedBg: Colors.primary[50],
            rowSelectedHoverBg: Colors.primary[100],
          },
        },
        token: {
          colorPrimary: Colors.kingTide,
          colorPrimaryHover: Colors.kingTide,
        },
      }}
    >
      <div style={style}>
        <div style={{ fontSize: Size.XL, fontWeight: "bold" }}>{title}</div>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>

        <Modal
          title="Confirm Logout"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="logout" type="primary" onClick={handleLogout}>
              Logout
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: "15px",
            }}
          >
            <span>Are you sure you want to logout?</span>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};
