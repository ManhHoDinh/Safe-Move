import { Colors } from "../utils/colors";
import Logo from "../images/SAFEMOVE.png";

export const AppHeader = () => {
  return (
    <div
      style={{
        height: "7vh",
        width: "100vw",
        backgroundColor: Colors.white,
        alignItems: "center",
        paddingLeft: "3vw",
        display: "flex",
      }}
    >
      <img src={Logo} alt="logo" />
    </div>
  );
};
