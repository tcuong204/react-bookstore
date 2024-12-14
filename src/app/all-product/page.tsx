"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { getAllProducts, Product } from "@/utils/ProductUtils";
import { Divider, Pagination, Rate } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllProduct() {
  const [product, setProduct] = useState<Product[] | null>(null);
  const getProducts = async () => {
    const data = await getAllProducts();
    if (data) {
      setProduct(data);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Header />
      <div className="flex justify-center bg-grayBg">
        <div className="w-[72%] bg-[#fff] rounded-lg mt-[1rem] ">
          <div className="p-4 bg-[#FCDDEF]">
            <b>TẤT CẢ SẢN PHẨM</b>
          </div>
          <div className="grid grid-cols-5">
            {product?.map((value, index) => (
              <Link href={`detail-product/${value.id}`}>
                <div key={index} className="p-3 font-serif">
                  <div className="hover:shadow-md hover:cursor-pointer p-3">
                    <div>
                      <img src={value.image} loading="lazy"></img>
                    </div>
                    <div className="flex flex-col justify-between h-[87px] mt-[0.5rem]">
                      <h6 className="overflow-text  text-[0.78rem]">
                        {value.name}
                      </h6>
                      <p className="price !text-[18px] !pt-0">
                        {value.price.toLocaleString("en-US")}
                      </p>
                    </div>
                    <div className="">
                      <Rate
                        allowHalf
                        defaultValue={value.averageRating}
                        disabled
                      />
                      <Divider type="vertical" />
                      <span>
                        Đã bán <span>{value.soldCount}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="font-nunito py-[1rem]">
        <Pagination align="center" defaultCurrent={1} total={50} />
      </div>
      <Footer />
    </>
  );
}
