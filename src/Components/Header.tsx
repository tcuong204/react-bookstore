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
  AutoCompleteProps,
  Badge,
  Button,
  ConfigProvider,
  Divider,
  Input,
  Modal,
  Popover,
  Typography,
} from "antd";
import Search from "antd/es/input/Search";
import { CustomButton } from "../utils/CustomButton";
import { useEffect, useState } from "react";
import { LoginAndRegisterForm } from "../utils/LoginAndRegisterForm";
import Link from "next/link";
import { getUser, isLoggedIn, logout, User } from "@/utils/Auth";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axios/axiosConfig";
import { Cart, useCart } from "@/utils/CartContext";
import {
  ProductSearchResponse,
  ResultSearchProduct,
  searchProductbyName,
} from "@/utils/ProductUtils";
import { CategoriesResponse, getAllCategories } from "@/utils/Categories";
const Menu = () => {};
const { Text } = Typography;
export default function Header() {
  const [openPopup, setOpenPopup] = useState<true | false>(false);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<true | false>(false);
  const { cart, setCart } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [result, setResult] = useState<ProductSearchResponse | undefined>(
    undefined
  );
  const [categories, setCategories] = useState<CategoriesResponse>();
  const [q, setQ] = useState("");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const handleMouseEnter = (menuId: string) => {
    setHoveredMenu(menuId);
  };

  const onChange = (data: string) => {
    setQ(data);
  };
  const getCategories = async () => {
    const res = await getAllCategories();
    if (res) {
      setCategories(res);
    }
  };

  const getResult = async () => {
    if (q.length === 0) {
      return;
    }
    const filteredProducts = await searchProductbyName(q, undefined);

    setResult(filteredProducts);
  };
  const onSearch = (q: string) => {
    if (q === "") {
      router.push(`/all-product`);
    } else router.push(`/search/${q}`);
  };
  const getCart = async () => {
    const res = await axiosInstance
      .get<Cart>("/get-cart?userId=" + 1)
      .then((response) => {
        setCart(response.data);
      })
      .catch();
  };
  const GetDetailUser = async () => {
    const data = await getUser();
    if (data) {
      setUser(data);
    }
  };
  useEffect(() => {
    getCart();
    getResult();
  }, [q]);
  useEffect(() => {
    getCategories();
    setIsLogin(isLoggedIn);
    GetDetailUser();
  }, []);
  const PoperContentNoti = (
    <>
      <div className="p-4 flex justify-center">
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart_2.svg"
          alt="logo"
        ></img>
      </div>
      <div className="flex justify-center">
        <p>Chưa có thông báo nào</p>
      </div>
    </>
  );
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
      {cart?.totalQuantity === 0 || cart === null ? (
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
              <div key={index} className="flex p-2">
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
                    <a className="text-[14px] text-[#7A7E7F] ">{array.name}</a>
                  </div>
                  <div className="flex">
                    <b className="font-nunito font-[1.23rem]">
                      {array.price.toLocaleString("en-US")}
                    </b>
                    <a className="text-[13px]">x{array.quantity}</a>
                  </div>
                </div>
              </div>
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
                onClick={() => router.push("/shopping-cart")}
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
        <p onClick={() => router.push("/account")}>{user?.firstName}</p>
      </div>
      <hr />
      <div className="p-4 flex items-center cursor-pointer hover:bg-[#eee] rounded-lg">
        <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_bill_gray.svg"></img>
        <p onClick={() => router.push("/account/orders")}>Đơn hàng của tôi</p>
      </div>
      <hr />
      <div className="p-4 flex items-center cursor-pointer hover:bg-[#eee] rounded-lg">
        <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_logout_gray.svg"></img>
        <p onClick={logout}>Đăng xuất</p>
      </div>
    </>
  );
  return (
    <div className="flex justify-center bg-[#fff] relative">
      <div className="p-2  flex justify-between w-[72%] items-center relative">
        <Link href="/">
          <img
            src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png"
            width={220}
            alt=""
          />
        </Link>
        <div className="flex justify-between p-2 items-center menu-1">
          <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_menu.svg"></img>
          <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_seemore_gray.svg"></img>
          <div className="menu-2 ">
            <div className="flex">
              <div className="w-[40%]">
                <p className="text-[#7A7E7F] text-[20px] p-4">
                  DANH MỤC SẢN PHẨM
                </p>
                {categories?.categories.map((a, index) => (
                  <div key={index}>
                    <div
                      className="p-4 submenu rounded-lg hover:bg-[#ccc]"
                      onMouseEnter={() => setHoveredMenu(a.name)}
                    >
                      {a.name}
                      <div className="menu-3">
                        {a.name === hoveredMenu &&
                          a.topics.map((a, index) => (
                            <div key={index}>
                              <div className="submenu-2">{a.name}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Divider type="vertical" style={{ height: 225 }} />
            </div>
          </div>
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
            <AutoComplete
              style={{ width: 585, height: 40 }}
              value={q}
              options={result?.data.map((product) => ({
                value: product.name, // Giá trị để hiển thị trong input khi được chọn
                label: (
                  <div
                    key={product.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      style={{ borderRadius: "4px" }}
                    />
                    <div>
                      <Text strong>{product.name}</Text>
                      <br />
                      <Text type="secondary">
                        {product.price.toLocaleString("en-US")}đ
                      </Text>
                    </div>
                  </div>
                ),
              }))}
              onChange={onChange}
              allowClear
              onSelect={(e, op) => {
                router.push(`/detail-product/${op.label.key}`);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch(q);
                }
              }}
            >
              <Search
                size="large"
                placeholder="Tìm kiếm theo tên sản phẩm"
                className=""
                enterButton
                onSearch={() => {
                  onSearch(q);
                }}
              />
            </AutoComplete>
          </ConfigProvider>
        </div>
        <Popover
          content={isLogin ? PoperContentNoti : PoperContent}
          title="Thông báo"
        >
          <div className="p-2 cursor-pointer">
            <div className="flex justify-center">
              <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_noti_gray.svg"></img>
            </div>
            <div className="leading-5 text-[#7A7E7F] text-[12px] font-serif">
              Thông báo
            </div>
          </div>
        </Popover>
        {isLogin ? (
          <Popover content={isLogin ? PopoverCartContent : PoperContent}>
            <Link className="p-2 cursor-pointer" href="/shopping-cart">
              <div className="flex justify-center">
                <ConfigProvider
                  theme={{
                    components: {
                      Badge: { textFontSize: 8, textFontSizeSM: 8 },
                    },
                  }}
                >
                  <Badge count={cart?.totalQuantity} size="small" showZero>
                    <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_cart_gray.svg"></img>
                  </Badge>
                </ConfigProvider>
              </div>
              <div className="leading-5 text-[#7A7E7F] text-[12px] font-serif">
                Giỏ hàng
              </div>
            </Link>
          </Popover>
        ) : (
          <div>
            <div className="flex justify-center">
              <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_cart_gray.svg"></img>
            </div>
            <div className="leading-5 text-[#7A7E7F] text-[12px] font-serif">
              Giỏ hàng
            </div>
          </div>
        )}
        <Popover
          placement="bottomRight"
          content={isLogin ? PopoverContent2 : PoperContent}
        >
          {isLogin ? (
            <>
              <Link href="/account">
                <div className="p-2 cursor-pointer">
                  <div className="flex justify-center">
                    <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_account_gray.svg"></img>
                  </div>
                  <div className="leading-5 text-[#7A7E7F] text-[12px] font-serif">
                    {user?.lastName}
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <div className="p-2 cursor-pointer">
              <div className="flex justify-center">
                <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_account_gray.svg"></img>
              </div>
              <div className="leading-5 text-[#7A7E7F] text-[12px] font-serif">
                Người dùng
              </div>
            </div>
          )}
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
