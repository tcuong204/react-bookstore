"use client";
import {
  getAllProducts,
  getProductbyPage,
  Product,
  ProductResponse,
  ProductSearchResponse,
  ResultSearchProduct,
  searchProductbyName,
} from "@/utils/ProductUtils";
import { ConfigProvider, Divider, Pagination, Rate } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AllProduct() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pathname = usePathname();
  const param = pathname.split("/").pop();
  const [result, setResult] = useState<ProductSearchResponse | undefined>(
    undefined
  );
  const getResult = async () => {
    if (param?.length === 0) {
      return;
    }
    const filteredProducts = await searchProductbyName(param, currentPage);
    setResult(filteredProducts);
  };
  useEffect(() => {
    getResult();
  }, [currentPage]);
  return (
    <>
      <div className="flex justify-center bg-grayBg">
        <div className="w-[72%] bg-[#fff] rounded-lg mt-[1rem] ">
          <div className="p-4 ">
            <span>
              <b>Kết quả</b> cho "{param}": <span>({result?.data.length} </span>
              Sản phẩm)
            </span>
          </div>
          <div className="grid grid-cols-5">
            {result?.data.map((value, index) => (
              <div key={index}>
                <Link href={`/detail-product/${value.id}`}>
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
                          style={{ fontSize: "12px" }}
                        />
                        <Divider type="vertical" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="font-nunito py-[1rem]">
        <ConfigProvider theme={{ token: { colorPrimary: "#C62027" } }}>
          <Pagination
            align="center"
            defaultCurrent={1}
            total={result?.pagination.totalItems}
            onChange={(e) => setCurrentPage(e)}
          />
        </ConfigProvider>
      </div>
    </>
  );
}
