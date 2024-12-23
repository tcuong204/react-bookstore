"use client";
import { getUser, User } from "@/utils/Auth";
import { useUser } from "@/utils/UserContext";
import { ConfigProvider, Divider, GetProp, Menu, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
type MenuItem = GetProp<MenuProps, "items">[number];
const items: MenuItem[] = [
  {
    key: "1",
    icon: (
      <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_user_info/account.svg"></img>
    ),
    label: "Thông tin tài khoản",
    children: [
      { key: "account", label: <Link href="/account">Hồ sơ cá nhân</Link> },
      {
        key: "address",
        label: <Link href="/account/address">Sổ địa chỉ</Link>,
      },
    ],
  },
  {
    key: "2",
    icon: (
      <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_user_info/orders.svg"></img>
    ),
    label: <Link href="/account/orders">Đơn hàng của tôi</Link>,
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const param = pathname.split("/").pop();
  const { user, setUser } = useUser();
  return (
    <div className="flex justify-center bg-[#ccc] w-full p-4">
      <div className="flex justify-center w-[72%] p-4 rounded-lg bg-[#fff]">
        <div className="w-[25%] h-[900px] ">
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
              defaultSelectedKeys={[param]}
              defaultOpenKeys={["1"]}
              items={items}
              mode="inline"
            />
          </ConfigProvider>
        </div>
        <div className="w-[75%] h-[500px] bg-[#fff]">{children}</div>
      </div>
    </div>
  );
}
