"use client";
import { CustomButton } from "@/utils/CustomButton";
import {
  getProductbyPage,
  Product,
  ProductResponse,
} from "@/utils/ProductUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export function HotDeal() {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const router = useRouter();
  const getProducts = async () => {
    const data = await getProductbyPage(1);
    if (data) {
      setProduct(data);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section id="hot-deal" className="transition delay-0 duration-300 ease-in">
      <div className="flex justify-center algin-center bg-[#F0F0F0]">
        <div className="xl:w-[72%] bg-[#fff] rounded-lg">
          <div className="flex p-4 items-center bg-[#FCDDEF]">
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/icon_dealhot_new.png"
              alt="logo"
              width={32}
              height={32}
            ></img>
            <h2>Xu hướng mua sắm</h2>
          </div>
          <div className="grid grid-cols-5">
            {product?.products?.map((value, index) => (
              <div key={index}>
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
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center pb-[1rem]">
            <CustomButton
              className="w-[210px] h-[40px] !font-serif border-2 !text-[12px] !font-[550] "
              onClick={() => router.push("/all-product")}
              buttonText="Xem thêm"
              buttonType="default"
              disabled={false}
              htmlType="button"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
