import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Layout from "./components/MainLayout";
import MainRoutes from "./routes";
import { useGlobalContext } from "./utils/globalContext";

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useGlobalContext();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated ? (
    <Layout children={<MainRoutes />} />
  ) : (
    <AuthLayout />
  );
};

export default App;
