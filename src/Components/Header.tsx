"use client";
import {
  AppstoreAddOutlined,
  BellOutlined,
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  ConfigProvider,
  Divider,
  Input,
  Modal,
  Popover,
} from "antd";
import Search from "antd/es/input/Search";
import { CustomButton } from "../utils/CustomButton";
import { useState } from "react";
import { LoginAndRegisterForm } from "../utils/LoginAndRegisterForm";
import Link from "next/link";
import { isLoggedIn, logout } from "@/utils/Auth";
export default function Header() {
  const [openPopup, setOpenPopup] = useState<true | false>(false);
  const isLogin = isLoggedIn();
  console.log("islogin", isLogin);
  const PoperContent = (
    <>
      <Divider style={{ margin: 0 }} />
      <div className="p-4">
        <CustomButton
          className="w-full"
          onClick={() => setOpenPopup(true)}
          buttonText="Đăng nhập"
          buttonType="primary"
          disabled={false}
          htmlType="button"
        />
        <div>
          <CustomButton
            buttonType="default"
            className="w-full mt-[4px]"
            onClick={() => setOpenPopup(true)}
            buttonText="Đăng ký"
            disabled={false}
            htmlType="button"
          />
        </div>
      </div>
    </>
  );
  const PopoverContent2 = (
    <>
      <div className="p-4 flex items-center">
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/vip/ico_vip_copper.svg"
          alt="logo"
        ></img>
        <p>Trần Văn Cường</p>
      </div>
      <hr />
      <div className="p-4 flex items-center">
        <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_bill_gray.svg"></img>
        <p>Đơn hàng của tôi</p>
      </div>
      <hr />
      <div className="p-4 flex items-center cursor-pointer" onClick={logout}>
        <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_logout_gray.svg"></img>
        <p>Đăng xuất</p>
      </div>
    </>
  );
  return (
    <div className="flex justify-center bg-[#fff]">
      <div className="p-2  flex justify-between w-[72%] items-center">
        <Link href="/">
          <img
            src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png"
            width={220}
            alt=""
          />
        </Link>
        <div className="flex justify-between p-2">
          <AppstoreAddOutlined />
          <DownOutlined />
        </div>
        <div className="flex items-center p-2">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#C62027",
              },
              components: {
                Button: {
                  borderRadius: 16,
                },
              },
            }}
          >
            <AutoComplete style={{ width: 585, height: 40 }} className="">
              <Search
                size="large"
                placeholder="Nexus - Kỷ nguyên thông tin của loài người"
                className=""
                enterButton
              />
            </AutoComplete>
          </ConfigProvider>
        </div>
        <Popover content={PoperContent} title="Thông báo">
          <div className="p-2 cursor-pointer">
            <div className="flex justify-center">
              <BellOutlined />
            </div>
            <div className="leading-5 text-[#7A7E7F] text-[12px]">
              Thông báo
            </div>
          </div>
        </Popover>
        <Link className="p-2 cursor-pointer" href="/shopping-cart">
          <div className="flex justify-center">
            <ShoppingCartOutlined />
          </div>
          <div className="leading-5 text-[#7A7E7F] text-[12px]">Giỏ hàng</div>
        </Link>
        <Popover
          placement="bottomRight"
          content={isLogin ? PopoverContent2 : PoperContent}
        >
          <div className="p-2 cursor-pointer">
            <div className="flex justify-center">
              <UserOutlined />
            </div>
            {isLogin ? (
              <div className="leading-5 text-[#7A7E7F] text-[12px]">
                Cường Trần
              </div>
            ) : (
              <div className="leading-5 text-[#7A7E7F] text-[12px]">
                Người dùng
              </div>
            )}
          </div>
        </Popover>
      </div>
      <Modal
        open={openPopup}
        onCancel={() => setOpenPopup(false)}
        footer={null}
      >
        <LoginAndRegisterForm setOpenPopup={() => setOpenPopup(false)} />
      </Modal>
    </div>
  );
}
