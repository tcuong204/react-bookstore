"use client";
import { GetProp, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
type MenuItem = GetProp<MenuProps, "items">[number];
const items1: MenuItem[] = [
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
const items = [
  { key: "user-info", label: <Link to="user-info">Hồ sơ cá nhân</Link> },
  { key: "address", label: <Link to="address">Sổ địa chỉ</Link> },
];

export const MenuComponent = () => (
  <Menu style={{ width: 256 }} items={items} mode="inline" />
);
