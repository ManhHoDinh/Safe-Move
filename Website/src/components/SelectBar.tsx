import { ConfigProvider, Select } from "antd";
import { ISelectValue } from "../utils/types";
import { Colors } from "../utils/colors";

export const SelectBar = <T extends string>({
  defaultValue,
  options,
  setSelectedValue,
}: {
  defaultValue: T;
  options: ISelectValue[];
  setSelectedValue: (val: T) => void;
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            activeBorderColor: Colors.primary[500],
            hoverBorderColor: Colors.primary[500],
            optionSelectedBg: Colors.primary[100],
          },
        },
      }}
    >
      <Select
        defaultValue={defaultValue}
        style={{ width: 120 }}
        onChange={(value: T) => setSelectedValue(value)} // Use generic type T here
        options={options}
      />
    </ConfigProvider>
  );
};
