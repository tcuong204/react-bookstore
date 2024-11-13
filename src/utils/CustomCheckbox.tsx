import { Checkbox, ConfigProvider, Divider } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";
import { useState } from "react";
import type { CheckboxProps } from "antd";
const theme: ThemeConfig = {
  token: {
    colorPrimary: "#C62027", // Set primary color
    colorBgContainer: "#fff", // Background color for the button
    colorBorder: "#C62027", // Border color for buttons
    colorText: "#fff", // Text color for primary buttons
  },
  components: {
    Button: {
      colorPrimaryHover: "#a91d21", // Hover color for primary buttons
      colorBorder: "#C62027", // Border for default buttons
      colorTextDisabled: "#aaa", // Text color when disabled
      defaultColor: "#C62027",
    },
  },
};
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];

export const CustomCheckbox = () => {
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <ConfigProvider theme={theme}>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </ConfigProvider>
  );
};
