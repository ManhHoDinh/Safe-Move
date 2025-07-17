import { ConfigProvider, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import { Colors } from "../utils/colors";

export const SearchBar = ({onSearchChange} : {onSearchChange: (val: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void}) => {
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
      <Input
        placeholder="Search"
        style={{ width: 300 }}
        prefix={<CiSearch />}
        onChange={onSearchChange}
      />
    </ConfigProvider>
  );
};
