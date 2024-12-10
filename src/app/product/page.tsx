"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { CustomButton } from "@/utils/CustomButton";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useState } from "react";

export default function Product() {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <Header />
      <div className="w-full bg-[#ccc] flex justify-center p-4">
        <div className="w-[484px] rounded-lg p-4 mr-[4px]  bg-[#fff] sticky left-0">
          <div className="">
            <Image src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_208345.jpg"></Image>
          </div>
          <div className="flex">
            <div className="border-[#2489F4] hover:border-[1px] ">
              <Image
                src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_208345.jpg"
                height={82}
                width={82}
              ></Image>
            </div>
            <div className="border-[#2489F4] hover:border-[1px] ">
              <Image
                src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_208345.jpg"
                height={82}
                width={82}
              ></Image>
            </div>
            <div className="border-[#2489F4] hover:border-[1px] ">
              <Image
                src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_208345.jpg"
                height={82}
                width={82}
              ></Image>
            </div>
            <div className="border-[#2489F4] hover:border-[1px] ">
              <Image
                src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_208345.jpg"
                height={82}
                width={82}
              ></Image>
            </div>
            <div className="border-[#2489F4] hover:border-[1px] ">
              <Image
                src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_208345.jpg"
                height={82}
                width={82}
              ></Image>
            </div>
          </div>
          <div className="flex p-4">
            <CustomButton
              className="w-full "
              onClick={() => console.log()}
              buttonText="Thêm vào giỏ hàng"
              buttonType="default"
              disabled={false}
              htmlType="button"
            />
            <CustomButton
              className="w-full ml-[4px]"
              onClick={() => console.log()}
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
              How Psychology Works - Hiểu Hết Về Tâm Lý Học
            </div>
            <div className="w-[60%] flex justify-between font-nunito">
              <div>
                <span>Nhà xuất bản:Thế Giới</span>
                <span>Nhà cung cấp:Nhã Nam</span>
              </div>
              <div>
                <span>Nhà xuất bản:Thế Giới</span>
                <span>Nhà cung cấp:Nhã Nam</span>
              </div>
            </div>
            <div className="price">231.000d</div>
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
                  className="focus:outline-none px-[1em]"
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
        </div>
      </div>
      {/* <div className="bg-[#fff]">
        <h2>Sản phẩm khác</h2>
      </div> */}
      <Footer />
    </>
  );
}
