"use client";

import UserInfo from "@/Components/Account/UserInfo";
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
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
      <UserInfo user={user} />
    </>
  );
}
