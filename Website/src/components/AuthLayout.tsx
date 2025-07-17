import { Button, ConfigProvider, Input, Modal } from "antd";
import { CSSProperties, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Colors } from "../utils/colors";
import { useGlobalContext } from "../utils/globalContext";
import { Size } from "../utils/size";
import { AppHeader } from "./AppHeader";

interface FormData {
  email: string;
  password: string;
}

const AuthLayout: React.FC = () => {
  const { handleSubmit, control } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsAuthenticated } = useGlobalContext();

  const onSubmit = (data: FormData) => {
    if (
      data.email !== "21522041@gm.uit.edu.vn" ||
      data.password !== "123456789"
    ) {
      setErrorMessage("Email or Password is incorrect. Please retry it!");
    } else {
      localStorage.setItem("email", data.email);
      localStorage.setItem("password", data.password);
      setIsAuthenticated(true)
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: Colors.primary[500],
            hoverBorderColor: Colors.primary[500],
          },
        },
      }}
    >
      <div style={containerStyle}>
        <AppHeader />
        <Modal open={true} footer={null} centered closable={false} width={430}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ gap: 16, display: "flex", flexDirection: "column" }}
          >
            <div style={{ fontSize: Size.XL, fontWeight: "bold" }}>
              Welcome back!
            </div>
            <div style={{ gap: 4, display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: Size.S }}>Email Address</div>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input {...field} placeholder="Email Address" size="middle" />
                )}
              />
            </div>
            <div style={{ gap: 4, display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: Size.S }}>Password</div>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Password"
                    size="middle"
                  />
                )}
              />
            </div>
            {errorMessage && (
              <div style={{ color: "red", fontSize: "0.8em" }}>
                {errorMessage}
              </div>
            )}
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: Colors.primary[500] }}
            >
              Login
            </Button>
          </form>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  backgroundColor: Colors.backgroundColor,
  height: "100%",
};
export default AuthLayout;
