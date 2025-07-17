import { Button } from "antd";
import { Colors } from "../utils/colors";

export const CustomButton = ({ title }: { title: string }) => {
  return (
    <Button type="primary" style={{ backgroundColor: Colors.kingTide }}>
      {title}
    </Button>
  );
};
