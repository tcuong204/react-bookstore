"use client";
import Header from "@/Components/Header";
import { getUser, User } from "@/utils/Auth";
import { LinkOutlined, SettingOutlined } from "@ant-design/icons";
import {
  ConfigProvider,
  Divider,
  GetProp,
  Input,
  Menu,
  MenuProps,
  Switch,
} from "antd";
import { useEffect, useState } from "react";

type MenuTheme = GetProp<MenuProps, "theme">;

type MenuItem = GetProp<MenuProps, "items">[number];
const items: MenuItem[] = [
  {
    key: "1",
    icon: (
      <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_user_info/account.svg"></img>
    ),
    label: "Thông tin tài khoản",
    children: [
      { key: "3", label: "Hồ sơ cá nhân" },
      { key: "4", label: "Sổ địa chỉ" },
    ],
  },
  {
    key: "2",
    icon: (
      <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_user_info/orders.svg"></img>
    ),
    label: "Đơn hàng của tôi",
  },
];

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");
  const GetDetailUser = async () => {
    const data = await getUser();
    if (data) {
      setUser(data);
    }
  };
  useEffect(() => {
    GetDetailUser();
  }, []);
  console.log(user);
  return (
    <>
      <Header />
      <div className="flex justify-center bg-[#ccc] w-full">
        <div className="flex justify-center w-[72%] mt-[1rem] rounded-lg">
          <div className="w-[25%] h-[500px] bg-[#fff]">
            <div className="flex justify-center">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_rank_silver.png"
                width={80}
                height={80}
              ></img>
            </div>
            <div className="flex justify-center mt-[1rem]">
              <label>{user?.firstName}</label>
            </div>
            <Divider />
            <ConfigProvider
              theme={{
                token: {},
                components: {
                  Menu: {
                    horizontalItemSelectedColor: "#C92127",
                    horizontalItemHoverColor: "#C92127",
                    darkItemSelectedBg: "#C92127",
                    itemSelectedColor: "#C92127",
                  },
                },
              }}
            >
              <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                items={items}
                mode="inline"
              />
            </ConfigProvider>
          </div>
          <div className="w-[75%] h-[500px] bg-[#fff]"></div>
        </div>
      </div>
    </>
  );
}
