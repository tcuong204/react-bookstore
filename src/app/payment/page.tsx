"use client";
import Header from "@/Components/Header";
import { Divider, Input } from "antd";
import { useEffect, useState } from "react";
import { Cart } from "../shopping-cart/page";
import axiosInstance from "@/axios/axiosConfig";
import { CustomButton } from "@/utils/CustomButton";

export default function Payment() {
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
  }, []);
  return (
    <>
      <Header />
      <div className="bg-[#ccc]  ">
        <div className="flex justify-center">
          <div className="bg-[#fff] w-[72%] p-4 mt-4">
            <b>ĐỊA CHỈ GIAO HÀNG</b>
            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
            <div className="flex p-2 items-center">
              <label className="font-[400] text-[14px] text-center">
                Họ và tên người nhận
              </label>
              <Input />
            </div>
            <div className="flex p-2 items-center">
              <label className="font-[400] text-[14px] text-center">
                Số điện thoại
              </label>
              <Input />
            </div>
            <div className="flex p-2 items-center">
              <label className="font-[400] text-[14px] text-center">
                Quốc gia
              </label>
              <Input />
            </div>
            <div className="flex p-2 items-center">
              <label className="font-[400] text-[14px] text-center">Tỉnh</label>
              <Input />
            </div>
            <div className="flex p-2 items-center">
              <label className="font-[400] text-[14px] text-center">
                Huyện
              </label>
              <Input />
            </div>
            <div className="flex p-2 items-center">
              <label className="font-[400] text-[14px] text-center">
                Thành phố
              </label>
              <Input />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-[#fff] w-[72%] p-4 mt-4">
            <b>KIỂM TRA ĐƠN HÀNG</b>
            {cart?.cartItems.map((array, index) => (
              <>
                <Divider style={{ marginTop: 6, marginBottom: 6 }} />
                <div className="flex">
                  <div>
                    <img
                      src={array.image}
                      alt={array.name}
                      width={145}
                      height={145}
                    ></img>
                  </div>
                  <div className="w-[60%]">
                    <a className="">{array.name}</a>
                  </div>
                  <div className="sans-serif text-[14px] ">
                    {array.originalPrice.toLocaleString("en-US")}đ
                  </div>
                  <div className="w-[14%] flex justify-center text-[14px]">
                    {array.quantity}
                  </div>
                  <div className="sans-serif font-[600] text-[#F39801] text-[14px]">
                    {array.price.toLocaleString("en-US")}đ
                  </div>
                </div>
              </>
            ))}
            <div className="flex justify-center">
              <CustomButton
                className="w-[30%] "
                onClick={() => console.log()}
                buttonText="THANH TOÁN"
                buttonType="primary"
                disabled={false}
                htmlType="button"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
