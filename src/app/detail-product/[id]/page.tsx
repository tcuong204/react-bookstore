"use client";
import axiosInstance from "@/axios/axiosConfig";
import { Cart, useCart } from "@/utils/CartContext";
import { CustomButton } from "@/utils/CustomButton";
import { DetailProduct, getDetailProduct } from "@/utils/ProductUtils";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Divider, Image, message } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
export default function DetailProductt() {
  const [product, setProduct] = useState<DetailProduct | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { cart, setCart } = useCart();
  const [messageApi, contextHolder] = message.useMessage();
  const pathname = usePathname();
  const param = pathname.split("/").pop();
  const router = useRouter();
  const getProduct = async () => {
    const data = await getDetailProduct(Number(param));
    if (data) setProduct(data);
  };
  const getCart = async () => {
    const res = await axiosInstance
      .get<Cart>("/get-cart?userId=" + 1)
      .then((response) => {
        setCart(response.data);
      })
      .catch();
  };
  const addToCart = async (productId: number | undefined, quantity: number) => {
    const body = {
      userId: 1,
      productId: productId,
      quantity: quantity,
    };
    const res = axiosInstance
      .post<Cart>("/add-to-cart", body)
      .then((res) => {
        if (res.status === 200) {
          getCart();
          message.success("Thêm sản phẩm thành công");
        } else {
          message.error("Thêm sản phẩm không thành thành công");
        }
      })
      .catch();
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <div className="w-full bg-[#ccc] flex justify-center p-4">
        <div className="w-[484px] h-[650px] rounded-lg p-4 mr-[4px]  bg-[#fff] sticky left-0 top-[16px]">
          <div className="">
            <Image src={product?.images.at(0)?.url}></Image>
          </div>
          <div className="flex">
            {product?.images.map((arr, index) => (
              <div key={index}>
                <div className="border-[#2489F4] hover:border-[1px] ">
                  <Image src={arr.url} height={82} width={82}></Image>
                </div>
              </div>
            ))}
          </div>
          <div className="flex p-4">
            <CustomButton
              className="w-full "
              onClick={() => {
                addToCart(product?.id, quantity);
              }}
              buttonText="Thêm vào giỏ hàng"
              buttonType="default"
              disabled={false}
              htmlType="button"
            />
            <CustomButton
              className="w-full ml-[4px]"
              onClick={() => {
                addToCart(product?.id, quantity);
                router.push("/shopping-cart");
              }}
              buttonText="Mua ngay"
              buttonType="primary"
              disabled={false}
              htmlType="button"
            />
          </div>
        </div>
        <div className="w-[698px] ">
          <div className="bg-[#fff] h-[250px] rounded-lg p-4">
            <div className="font-nunito text-[1.6em] font-600 text-blackText">
              {product?.name}
            </div>
            <div className="w-full flex  font-nunito">
              <div className="w-[60%]">
                <div>
                  <span>
                    Nhà xuất bản:
                    {
                      <span className="text-[#2489F4] font-bold">
                        {product?.publisher}
                      </span>
                    }
                  </span>
                </div>
                <span>
                  Nhà cung cấp:
                  {<span className="font-bold">{product?.supplier}</span>}
                </span>
              </div>
              <div>
                <div>
                  <span>
                    Tác giả:
                    {<span className="font-bold">{product?.author}</span>}
                  </span>
                </div>
                <span>
                  Hình thức bìa:
                  {<span className="font-bold">{product?.bookLayout}</span>}
                </span>
              </div>
            </div>
            <div className="price">
              {product?.price.toLocaleString("en-US")}đ
            </div>
          </div>
          <div className="bg-[#fff] h-[250px] rounded-lg p-4 mt-[0.5em]">
            <h2>Thông tin vận chuyển</h2>
            <span className="font-nunito">
              Giao hàng đến
              <span className="font-700"> Phường bến nghé, Quận 1,HCM</span>
            </span>
            <div className="flex items-center">
              <label className="mr-[3em]">Số lượng:</label>
              <div className="flex items-center border-[1px] border-[#E0E0E0E0] border-solid rounded-lg">
                <div className=" px-[10px]">
                  <MinusOutlined
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  />
                </div>
                <input
                  value={quantity}
                  className="focus:outline-none px-[0.5em]"
                  style={{
                    color: "#0D0E0F",
                    lineHeight: 1.42857,
                    width: 40,
                    height: 30,
                    fontWeight: 700,
                    fontFamily: "inherit",
                  }}
                />
                <div className="px-[10px]">
                  <PlusOutlined onClick={() => setQuantity(quantity + 1)} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#fff] rounded-lg p-4 mt-[0.5em] ">
            <h2 className="mb-[1rem]">Thông tin chi tiết</h2>
            <div className="flex font-nunito">
              <div className="w-[20%]">
                <label className="table-lable">Mã hàng</label>
              </div>
              <span className="">{product?.productCode}</span>
            </div>
            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
            <div className="flex font-nunito">
              <div className="w-[20%]">
                <label className="table-lable">Tên nhà cung cấp</label>
              </div>
              <span className="">{product?.supplier}</span>
            </div>
            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
            <div className="flex font-nunito">
              <div className="w-[20%]">
                <label className="table-lable">Tác giả</label>
              </div>
              <span className="">{product?.author}</span>
            </div>
            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
            <div className="flex font-nunito">
              <div className="w-[20%]">
                <label className="table-lable">NSB</label>
              </div>
              <span className="">{product?.publisher}</span>
            </div>
            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
            <div className="flex font-nunito">
              <div className="w-[20%]">
                <label className="table-lable">Năm XB</label>
              </div>
              <span className="">{product?.publishYear}</span>
            </div>
            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
            <div className="flex font-nunito">
              <div className="w-[20%]">
                <label className="table-lable">Ngôn ngữ</label>
              </div>
              <span className="">{product?.language}</span>
            </div>
            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
            <div className="flex font-nunito">
              <div className="w-[20%]">
                <label className="table-lable">Trọng lượng</label>
              </div>
              <span className="">{product?.weight}g</span>
            </div>
            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
            <div className="flex font-nunito">
              <div className="w-[20%]">
                <label className="table-lable">Kích thước</label>
              </div>
              <span className="">{product?.size}</span>
            </div>
            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
            <div className="flex font-nunito">
              <div className="w-[20%]">
                <label className="table-lable">Số trang</label>
              </div>
              <span className="">{product?.quantityOfPages}</span>
            </div>
            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
          </div>
          <div className="bg-[#fff] rounded-lg p-4 mt-[0.5em]">
            <h2>Mô tả sản phẩm</h2>
            <div className="py-[1rem]">
              <span className="font-bold ">{product?.name}</span>
            </div>
            <span className=" font-nunito">{product?.description}</span>
          </div>
        </div>
      </div>
    </>
  );
}
