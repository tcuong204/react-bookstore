"use client";
import { CustomButton } from "@/utils/CustomButton";

const Array = [
  {
    img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_56100.jpg",
    name: "Nước Mỹ Trong Mắt Trump - The United States Of Trump : How The President Really Sees America",
    price: "32.000đ",
  },
  {
    img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_56100.jpg",
    name: "Nước Mỹ Trong Mắt Trump - The United States Of Trump : How The President Really Sees America",
    price: "32.000đ",
  },
  {
    img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_56100.jpg",
    name: "Nước Mỹ Trong Mắt Trump - The United States Of Trump : How The President Really Sees America",
    price: "32.000đ",
  },
  {
    img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_56100.jpg",
    name: "Nước Mỹ Trong Mắt Trump - The United States Of Trump : How The President Really Sees America",
    price: "32.000đ",
  },
  {
    img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_56100.jpg",
    name: "Nước Mỹ Trong Mắt Trump - The United States Of Trump : How The President Really Sees America",
    price: "32.000đ",
  },
  {
    img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_56100.jpg",
    name: "Nước Mỹ Trong Mắt Trump - The United States Of Trump : How The President Really Sees America",
    price: "32.000đ",
  },
  {
    img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_56100.jpg",
    name: "Nước Mỹ Trong Mắt Trump - The United States Of Trump : How The President Really Sees America",
    price: "32.000đ",
  },
  {
    img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_56100.jpg",
    name: "Nước Mỹ Trong Mắt Trump - The United States Of Trump : How The President Really Sees America",
    price: "32.000đ",
  },
  {
    img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_56100.jpg",
    name: "Nước Mỹ Trong Mắt Trump - The United States Of Trump : How The President Really Sees America",
    price: "32.000đ",
  },
  {
    img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_56100.jpg",
    name: "Nước Mỹ Trong Mắt Trump - The United States Of Trump : How The President Really Sees America",
    price: "32.000đ",
  },
];
export function HotDeal() {
  return (
    <>
      <div className="flex justify-center algin-center bg-[#ccc]">
        <div className="xl:w-[1280px] bg-[#fff] rounded-lg">
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
            {Array.map((value, index) => (
              <div key={index} className="p-3 ">
                <div className="hover:shadow-md hover:cursor-pointer p-3">
                  <div>
                    <img src={value.img} loading="lazy"></img>
                  </div>
                  <h6 className="overflow-text  text-[0.78rem]">
                    {value.name}
                  </h6>
                  <p className="price !text-[18px] !pt-0">{value.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <CustomButton
              className="w-[210px] h-[40px] !font-serif border-2 !text-[12px] !font-[550]"
              onClick={() => console.log()}
              buttonText="Xem thêm"
              buttonType="default"
              disabled={false}
              htmlType="button"
            />
          </div>
        </div>
      </div>
    </>
  );
}
