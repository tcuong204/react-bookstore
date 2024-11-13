"use client";
import Header from "@/Components/Header";
import { CustomButton } from "@/utils/CustomButton";
import { useState } from "react";
import { Checkbox, ConfigProvider, Divider, InputNumber, Row } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";
import type { CheckboxProps } from "antd";
import { DeleteFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
interface Cart {
  id: number;
  url: string;
  name: string;
  price: number;
  quantity: number;
  finalPrice: number;
}
const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = [""];
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
const array: Cart[] = [
  {
    id: 0,
    url: "https://cdn0.fahasa.com/media/catalog/product//9/7/9786044742250.jpg",
    name: "Tư duy mở",
    price: 30000,
    quantity: 1,
    finalPrice: 30000,
  },
  {
    id: 0,
    url: "https://cdn0.fahasa.com/media/catalog/product//9/7/9786043440287.jpg",
    name: "Tư duy ngược",
    price: 40000,
    quantity: 1,
    finalPrice: 30000,
  },
];
export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState(1);
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  console.log(
    "ary",
    array.map((a) => a.name)
  );

  return (
    <>
      <Header />
      <div className="flex justify-center bg-[#F0F0F0] font-nunito">
        <div className="p-2   w-[72%]">
          <div className="my-[0.5em]">
            <span className="font-[500] text-grayText  leading-5  ml-[0.5em] text-[20px]">
              GIỎ HÀNG ({shoppingCart} sản phẩm)
            </span>
          </div>
          <div className=" flex ">
            {shoppingCart === 0 ? (
              <div className="rounded-4 bg-[#fff] w-full pt-[1em] pb-[1em]">
                <div className="flex justify-center">
                  <img src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg"></img>
                </div>
                <div className="flex justify-center mt-[1em] mb-[1em] ">
                  <p className="text-[14px] color-[#333333]">
                    Chưa có sản phẩm trong giỏ hàng của bạn
                  </p>
                </div>
                <div className="flex justify-center">
                  <CustomButton
                    buttonText="Mua sắm ngay"
                    buttonType="primary"
                    htmlType="button"
                    onClick={() => console.log("clicked")}
                    className=""
                    disabled={false}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="p-2   w-[72%] ">
                  <ConfigProvider theme={theme}>
                    <div className="flex p-2 w-full bg-[#fff] rounded-md">
                      <div className="w-[65%] flex items-center">
                        <Checkbox
                          indeterminate={indeterminate}
                          onChange={onCheckAllChange}
                          checked={checkAll}
                          className="color-[#fff]"
                        >
                          Check all
                        </Checkbox>
                      </div>
                      <div className="flex justify-between w-[27%]">
                        <p>Số lượng</p>
                        <p>Thành tiền</p>
                      </div>
                    </div>
                    <div className="bg-[#fff] mt-[1rem] ">
                      {array.map((a, index) => (
                        <>
                          <div className="w-full  flex py-[1.6em]">
                            <Checkbox onChange={() => setTotalPrice(a.price)} />
                            <img
                              src={a.url}
                              alt={a.name}
                              width={120}
                              height={120}
                            ></img>
                            <div className="flex flex-col justify-between basis-[48%]">
                              <div>
                                <p>{a.name}</p>
                              </div>
                              <b>{a.price}đ</b>
                            </div>
                            <div className="flex items-center justify-between w-[27%]">
                              <div className="flex items-center border-2 border-[#E0E0E0E0] border-solid rounded-lg">
                                <MinusOutlined
                                  onClick={() =>
                                    quantity > 1 && setQuantity(quantity - 1)
                                  }
                                />
                                <input
                                  defaultValue={a.quantity}
                                  className="focus:outline-none px-[1em]"
                                  style={{
                                    color: "#545759",
                                    lineHeight: 1.42857,
                                    width: 40,
                                    height: 30,
                                  }}
                                  onBlur={(e) => {
                                    Number(e.target.value) < 1
                                      ? (a.quantity = 1)
                                      : (a.quantity = Number(e.target.value));
                                  }}
                                />
                                <PlusOutlined onClick={() => a.quantity + 1} />
                              </div>
                              <div className="text-[#c62027] font-serif text-[1.2em] font-bold">
                                {a.finalPrice} đ
                              </div>
                            </div>
                            <div className="flex items-center justify-center w-[8%]">
                              <DeleteFilled />
                            </div>
                            <h2>{}</h2>
                          </div>
                          {index !== array.length - 1 && (
                            <div className="flex justify-center">
                              <Divider style={{ margin: 0, minWidth: "95%" }} />
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </ConfigProvider>
                </div>
                <div className="w-[28%]  mt-[4rem] font-nunito">
                  <div className="bg-[#fff] rounded-md">
                    <div className="p-4">
                      <p className="font-400 ">Thành tiền</p>
                      <h4></h4>
                    </div>
                    <hr />
                    <div className="p-4">
                      <b className="text-grayText">Tổng số tiền(Bao gồm VAT)</b>
                    </div>
                    <div className="p-4">
                      <CustomButton
                        className="w-full "
                        onClick={() => console.log()}
                        buttonText="THANH TOÁN"
                        buttonType="primary"
                        disabled={false}
                        htmlType="button"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
