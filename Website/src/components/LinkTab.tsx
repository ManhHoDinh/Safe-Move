import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { Colors } from "../utils/colors";
import { Size } from "../utils/size";

interface IProps {
  icon: IconType;
  title: string;
  link: string;
  isActive: boolean;
  onSelect: () => void;
}

export const LinkTab = ({
  icon: Icon,
  title,
  link,
  isActive,
  onSelect,
}: IProps) => {
  return (
    <Link
      to={link}
      style={{
        textDecoration: "none",
        color: isActive ? Colors.kingTide : Colors.echoBlue,
        width: "100%",
        borderRight: isActive ? `solid 3px ${Colors.kingTide}` : undefined,
        boxSizing: "border-box",
      }}
      onClick={onSelect}
    >
      <div
        style={{
          flexDirection: "row",
          fontSize: Size.M,
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "20px",
          paddingLeft: "20px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Icon size={Size.S} />
        <div>{title}</div>
      </div>
    </Link>
  );
};
