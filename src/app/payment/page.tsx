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
interface CartItem {
  productId: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  totalPrice: number;
}

interface CheckOut {
  message: string;
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  shippingFee: number;
}
export default function Payment() {
  const [checkout, setcheckout] = useState<CheckOut | null>(null);
  const [method, setMethod] = useState<"bank_transfer" | "cash_on_delivery">(
    "cash_on_delivery"
  );
  const [address, setAddress] = useState<Address[] | null>(null);
  const router = useRouter();
  const getCart = async () => {
    const res = await axiosInstance
      .get<CheckOut>("/checkout?userId=" + 1)
      .then((response) => {
        setcheckout(response.data);
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
  console.log(checkout);

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
            {checkout?.items?.map((array, index) => (
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
          </div>
        </div>
      </div>
      <div className=" flex  justify-center ">
        <div className="fixed z-10  w-[72%] bottom-0 bg-[#fff] h-[235px] shadow-inner shadow-[#ddd] rounded-lg">
          <div className="flex h-[50%] justify-end">
            <div className="p-4 flex flex-row">
              <div>
                <div>
                  <p className="text-[1.1rem] mr-[3rem]">Thành tiền:</p>
                </div>
                <div>
                  <span className="text-[1.1rem] mr-[3rem]">
                    Phí vận chuyển:
                  </span>
                </div>
                <div>
                  <b className="text-[1.1rem] mr-[3rem]">Tổng số tiền:</b>
                </div>
              </div>
              <div>
                <div>
                  <span className="text-[1.1rem] ">
                    {checkout?.totalAmount.toLocaleString("en-US")}
                  </span>
                </div>
                <div>
                  <span className="text-[1.1rem] ">
                    {checkout?.shippingFee.toLocaleString("en-US")}
                  </span>
                </div>
                <div>
                  <b className="text-[#F39801] text-[1.1rem]">
                    {checkout?.shippingFee &&
                      checkout.totalAmount &&
                      (
                        checkout?.totalAmount + checkout?.shippingFee
                      ).toLocaleString("en-US")}
                  </b>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-center">
            <CustomButton
              className="w-[30%] "
              onClick={() => createPayment()}
              buttonText="XÁC NHẬN THANH TOÁN"
              buttonType="primary"
              disabled={false}
              htmlType="button"
            />
          </div>
        </div>
      </div>
    </>
  );
}
