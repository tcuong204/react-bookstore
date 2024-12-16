"use client";
import {
  ConfigProvider,
  Divider,
  Input,
  Radio,
  RadioChangeEvent,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { themeRadio } from "../shopping-cart/page";
import axiosInstance from "@/axios/axiosConfig";
import { CustomButton } from "@/utils/CustomButton";
import Footer from "@/Components/Footer";
import { Address, getAddress } from "@/utils/AddressUtils";
import { useRouter } from "next/navigation";
import { Cart, useCart } from "@/utils/CartContext";

export default function Payment() {
  const { cart, setCart } = useCart();
  const [method, setMethod] = useState<"bank_transfer" | "cash_on_delivery">(
    "cash_on_delivery"
  );
  const [address, setAddress] = useState<Address[] | null>(null);
  const router = useRouter();
  const getCart = async () => {
    const res = await axiosInstance
      .get<Cart>("/get-cart?userId=" + 1)
      .then((response) => {
        setCart(response.data);
      })
      .catch();
  };
  const getAddressUser = async () => {
    const data = await getAddress();
    if (data) {
      setAddress(data);
    }
  };
  const createPayment = async () => {
    let body = {
      userId: 1,
      paymentMethod: method,
    };
    if (method === "cash_on_delivery") {
      const res = await axiosInstance
        .post("/create-order", body)
        .then((res) => {
          if (res.status === 200) {
            router.push("/payment/success");
          } else router.push("/payment/failed");
        });
    } else if (method === "bank_transfer") {
      const res = await axiosInstance
        .post("/create-order", body)
        .then((res) => {
          if (res.status === 200) {
            window.open(res.data.paymentUrl);
          } else router.push("/payment/failed");
        });
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    setMethod(e.target.value);
  };
  useEffect(() => {
    getCart();
    getAddressUser();
  }, []);

  return (
    <>
      <div className="bg-[#F0F0F0]  ">
        <div className="flex justify-center">
          <div className="bg-[#fff] w-[72%] p-4 mt-4">
            <b>ĐỊA CHỈ GIAO HÀNG</b>
            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
            {address?.map((arr, index) => (
              <div key={index}>
                <div className="flex p-2 items-center">
                  <span className="font-[400] text-[14px] text-center">
                    {arr.recipientName}
                  </span>
                  <Divider type="vertical" />
                  <span className="font-[400] text-[14px] text-center">
                    {arr.addressDetail},{" "}
                    <span className="font-[400] text-[14px] text-center">
                      {arr.ward},{" "}
                      <span className="font-[400] text-[14px] text-center">
                        {arr.district},{" "}
                        <span className="font-[400] text-[14px] text-center">
                          {arr.city}
                        </span>
                      </span>
                    </span>
                  </span>
                  <Divider type="vertical" />
                  <span className="font-[400] text-[14px] text-center">
                    {arr.recipientName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-[#fff] w-[72%] p-4 mt-4">
            <b>Hình thức thanh toán</b>
            <div className="mt-[1rem]">
              <ConfigProvider theme={themeRadio}>
                <Radio.Group onChange={onChange} value={method}>
                  <Space direction="vertical">
                    <Radio value={"cash_on_delivery"}>
                      Trả tiền khi nhận hàng
                    </Radio>
                    <Radio value={"bank_transfer"}>Chuyển khoản</Radio>
                  </Space>
                </Radio.Group>
              </ConfigProvider>
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
                    {array.price.toLocaleString("en-US")}đ
                    <div className="original-price">
                      {array.originalPrice.toLocaleString("en-US")}đ
                    </div>
                  </div>
                  <div className="w-[14%] flex justify-center text-[14px]">
                    {array.quantity}
                  </div>
                  <div className="sans-serif font-[600] text-[#F39801] text-[14px]">
                    {array.totalPrice.toLocaleString("en-US")}đ
                  </div>
                </div>
              </>
            ))}
            <div className="flex justify-center">
              <CustomButton
                className="w-[30%] "
                onClick={() => createPayment()}
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
