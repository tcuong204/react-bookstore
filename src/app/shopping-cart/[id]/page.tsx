"use client";
import { CustomButton } from "@/utils/CustomButton";
import { useEffect, useState } from "react";
import { Checkbox, ConfigProvider, Divider, message, Spin } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";
import type { CheckboxProps } from "antd";
import { DeleteFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { getUser } from "@/utils/Auth";
import debounce from "lodash.debounce";
import axiosInstance from "@/axios/axiosConfig";
import { useParams, useRouter } from "next/navigation";
import { Cart, useCart } from "@/utils/CartContext";
import { boolean } from "yup";
import Link from "next/link";
const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = [""];
export const themeRadio: ThemeConfig = {
  token: {
    colorPrimary: "#C62027", // Set primary color
    colorBgContainer: "#fff", // Background color for the button
    colorBorder: "#C62027", // Border color for buttons
    colorText: "#000", // Text color for primary buttons
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

export default function ShoppingCart() {
  const { cart, setCart } = useCart();
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const param = useParams();
  const [isCheckedAll, setIsCheckedAll] = useState<true | false>();
  const checkAll = plainOptions.length === checkedList.length;
  const [messageApi, contextHolder] = message.useMessage();
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list: string[]) => {
    setCheckedList(list);
  };
  const getCheckAll = async () => {
    const res = await axiosInstance
      .get("get-checked-all-cartItems?userId=" + param.id)
      .then((res) => setIsCheckedAll(res.data.isCheckedAll));
  };

  const deleteCartItem = async (cartItemId: number) => {
    try {
      const res = axiosInstance
        .delete<Cart>("/delete-cartitem?cartItemId=" + cartItemId)
        .then((res) => {
          if (res.status === 200) {
            messageApi.success("Bỏ sản phẩm khỏi giỏ hàng thành công");
            getCart();
          } else messageApi.error("Bỏ sản phẩm khỏi giỏ hàng không thành công");
        })
        .catch();
    } catch (error) {
      console.error("Failed to delete cart quantity:", error);
      messageApi.error("Bỏ sản phẩm khỏi giỏ hàng không thành công");
    } finally {
    }
  };
  const updateCartQuantity = async (cartId: number, quantity: number) => {
    let body = {
      cartItemId: cartId,
      quantity: quantity,
    };
    try {
      setIsLoading(true);
      const response = await axiosInstance
        .patch<Cart>("/update-cartitem", body)
        .then((res) => {
          if (res.status === 200) {
            getCart();
          }
        });
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  const addCheckedProduct = async (cartItemId: number, isChecked: boolean) => {
    let body = {
      cartItemId: cartItemId,
      isChecked: isChecked,
    };
    try {
      setIsLoading(true);
      const response = await axiosInstance
        .patch("/update-cartitem", body)
        .then((res) => {
          if (res.status === 200) {
            getCheckAll();
            getCart();
          }
        });
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  const updateQuantityDebouce = debounce(
    (cartItemId: number, quantity: number) => {
      updateCartQuantity(cartItemId, quantity);
    },
    100
  );
  const getCart = async () => {
    const res = await axiosInstance
      .get<Cart>("/get-cart?userId=" + param.id)
      .then((response) => {
        setCart(response.data);
      })
      .catch();
  };
  useEffect(() => {
    getCart();
    getCheckAll();
  }, []);
  const onCheckAllChange: CheckboxProps["onChange"] = async (e) => {
    let body = {
      userId: 1,
      isChecked: e.target.checked,
    };
    try {
      setIsLoading(true);
      const res = await axiosInstance
        .patch("check-all-cartitem", body)
        .then((res) => {
          setIsCheckedAll(e.target.checked);
          if (res.status === 200) {
            getCart();
          }
        });
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <>
      <div className="flex justify-center bg-[#F0F0F0] font-nunito">
        <div className="p-2   w-[73%]">
          <div className="my-[0.5em]">
            <span className="font-[500] text-grayText font-nunito  leading-5  ml-[0.5em] text-[20px]">
              GIỎ HÀNG ({cart?.totalQuantity} sản phẩm)
            </span>
          </div>
          <div className=" flex ">
            {cart?.totalQuantity === 0 ? (
              <div className="rounded-4 bg-[#fff] w-full m-h-[650px] pt-[1em] pb-[1em]">
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
                    onClick={() => router.push("/products")}
                    className=""
                    disabled={false}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="p-2   w-[72%] ">
                  <ConfigProvider theme={themeRadio}>
                    <div className="flex p-2 w-full bg-[#fff] rounded-md">
                      <div className="w-[67%] flex items-center ml-[0.5rem]">
                        <Checkbox
                          onChange={onCheckAllChange}
                          checked={isCheckedAll}
                          className="color-[#fff]"
                        >
                          <p>Chọn tất cả</p>
                        </Checkbox>
                      </div>
                      <div className="flex justify-between w-[27%]">
                        <p>Số lượng</p>
                        <p>Thành tiền</p>
                      </div>
                    </div>

                    <div className="bg-[#fff] mt-[1rem] min-h-[450px] p-4 rounded-lg">
                      <Spin spinning={isLoading}>
                        {cart?.cartItems?.map((a, index) => (
                          <div key={index}>
                            <div
                              key={index}
                              className="w-full  flex py-[1.6em]"
                            >
                              <Checkbox
                                checked={a.isChecked}
                                onChange={(e) =>
                                  addCheckedProduct(
                                    a.cartItemId,
                                    e.target.checked
                                  )
                                }
                                style={{ minWidth: 80 }}
                              />
                              <img
                                src={a.image}
                                alt={a.name}
                                width={120}
                                height={120}
                              ></img>
                              <div className="flex flex-col justify-between basis-[48%]">
                                <div>
                                  <Link href={`/detail-product/${a.productId}`}>
                                    {a.name}
                                  </Link>
                                </div>
                                <div className="flex">
                                  <b>{a.price?.toLocaleString("en-US")}đ</b>
                                  <div className="original-price  flex text-[13px] items-center ml-[0.5rem]">
                                    {a.originalPrice?.toLocaleString("en-US")}đ
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between w-[27%]">
                                <div className="flex items-center border-2 border-[#E0E0E0E0] border-solid rounded-lg">
                                  <MinusOutlined
                                    onClick={() => {
                                      if (a.quantity > 1) {
                                        updateQuantityDebouce(
                                          a.cartItemId,
                                          a.quantity - 1
                                        );
                                      }
                                    }}
                                  />
                                  <input
                                    value={a.quantity}
                                    className="focus:outline-none pl-[1em]"
                                    style={{
                                      color: "#545759",
                                      lineHeight: 1.42857,
                                      width: 40,
                                      height: 30,
                                    }}
                                    // onBlur={(e) => {
                                    //   Number(e.target.value) < 1
                                    //     ? (a.quantity = 1)
                                    //     : (a.quantity = Number(e.target.value));
                                    // }}
                                  />
                                  <PlusOutlined
                                    onClick={() => {
                                      updateQuantityDebouce(
                                        a.cartItemId,
                                        a.quantity + 1
                                      );
                                    }}
                                  />
                                </div>
                                <div className="text-[#c62027] font-serif text-[1.1em] font-bold">
                                  {a.totalPrice?.toLocaleString("en-US")} đ
                                </div>
                              </div>
                              <div className="flex items-center justify-center w-[8%]">
                                <DeleteFilled
                                  onClick={() => {
                                    deleteCartItem(a.cartItemId);
                                  }}
                                />
                              </div>
                              <h2>{}</h2>
                            </div>
                            {index !== cart.cartItems.length - 1 && (
                              <div className="flex justify-center">
                                <Divider
                                  style={{ margin: 0, minWidth: "95%" }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </Spin>
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
                    <div className="p-4 flex justify-between">
                      <b className="text-grayText">Tổng số tiền</b>
                      <div className="text-[#c62027] font-serif text-[1.2em] font-bold">
                        {cart?.totalAmount?.toLocaleString("en-US")} đ
                      </div>
                    </div>
                    <div className="p-4">
                      <CustomButton
                        className="w-full "
                        onClick={() => router.push(`/payment/${param.id}`)}
                        buttonText="THANH TOÁN"
                        buttonType="primary"
                        disabled={
                          cart?.cartItems.filter((a) => a.isChecked === true)
                            .length === 0
                            ? true
                            : false
                        }
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
      {contextHolder}
    </>
  );
}
