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
import { useEffect, useState } from "react";
import { LoginAndRegisterForm } from "../utils/LoginAndRegisterForm";
import Link from "next/link";
import { isLoggedIn, logout } from "@/utils/Auth";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { Cart } from "@/app/shopping-cart/page";
import axiosInstance from "@/axios/axiosConfig";
const Menu = () => {};
export default function Header() {
  const [openPopup, setOpenPopup] = useState<true | false>(false);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<true | false>(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const getCart = async () => {
    const res = await axiosInstance
      .get<Cart>("/get-cart?userId=" + 1)
      .then((response) => {
        setCart(response.data);
      })
      .catch();
  };

  useEffect(() => {
    getCart();
    setIsLogin(isLoggedIn);
  }, []);
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
  const PopoverCartContent = (
    <>
      <div className="p-2 flex ">
        <div className="flex">
          <img
            src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_cart_gray.svg"
            width={16}
            height={16}
          ></img>
          <p className="text-[14px] font-[600] apple-system">
            Giỏ hàng ({cart?.totalQuantity})
          </p>
        </div>
      </div>
      <Divider style={{ marginTop: 6, marginBottom: 6 }} />
      {cart?.totalAmount === 0 || cart === null ? (
        <>
          <div className="p-4 flex justify-center">
            <img
              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart_2.svg"
              alt="logo"
            ></img>
          </div>
          <p>Chưa có sản phẩm nào</p>
        </>
      ) : (
        <>
          <div className="m-h-[376px] overflow: scroll">
            {cart.cartItems.map((array, index) => (
              <>
                <div className="flex p-2">
                  <div>
                    <img
                      src={array.image}
                      alt={array.name}
                      width={65}
                      height={65}
                    ></img>
                  </div>
                  <div className="w-[252px] flex flex-col justify-between">
                    <div>
                      <a className="text-[14px] text-[#7A7E7F] ">
                        {array.name}
                      </a>
                    </div>
                    <div className="flex">
                      <b className="font-nunito font-[1.23rem]">
                        {array.price.toLocaleString("en-US")}
                      </b>
                      <a className="text-[13px]">x{array.quantity}</a>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="flex justify-between p-4">
            <div>
              <p>Tổng cộng</p>
              <div className="price !pt-0 !pb-0 !text-[16px]">
                {cart.totalAmount.toLocaleString("en-US")}đ
              </div>
            </div>
            <div className="flex items-center">
              <CustomButton
                className="w-full "
                onClick={() => router.push("shopping-cart")}
                buttonText="Xem thêm"
                buttonType="primary"
                disabled={false}
                htmlType="button"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
  const PopoverContent2 = (
    <>
      <div className="p-4 flex items-center">
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/vip/ico_vip_copper.svg"
          alt="logo"
        ></img>
        <p onClick={() => router.push("/account")}>Trần Văn Cường</p>
      </div>
      <hr />
      <div className="p-4 flex items-center">
        <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_bill_gray.svg"></img>
        <p>Đơn hàng của tôi</p>
      </div>
      <hr />
      <div className="p-4 flex items-center cursor-pointer">
        <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_logout_gray.svg"></img>
        <p onClick={logout}>Đăng xuất</p>
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
        <div className="flex justify-between p-2 items-center">
          <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_menu.svg"></img>
          <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_seemore_gray.svg"></img>
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
              <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_noti_gray.svg"></img>
            </div>
            <div className="leading-5 text-[#7A7E7F] text-[12px] font-serif">
              Thông báo
            </div>
          </div>
        </Popover>
        <Popover content={PopoverCartContent}>
          <Link className="p-2 cursor-pointer" href="/shopping-cart">
            <div className="flex justify-center">
              <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_cart_gray.svg"></img>
            </div>
            <div className="leading-5 text-[#7A7E7F] text-[12px] font-serif">
              Giỏ hàng
            </div>
          </Link>
        </Popover>
        <Popover
          placement="bottomRight"
          content={isLogin ? PopoverContent2 : PoperContent}
        >
          <div className="p-2 cursor-pointer">
            <div className="flex justify-center">
              <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_account_gray.svg"></img>
            </div>
            {isLogin ? (
              <div className="leading-5 text-[#7A7E7F] text-[12px] font-serif">
                Cường Trần
              </div>
            ) : (
              <div className="leading-5 text-[#7A7E7F] text-[12px] font-serif">
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
