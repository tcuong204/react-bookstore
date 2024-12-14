import Link from "next/link";
import CustomSwiper from "../utils/CustomSwiper";

export default function Banner() {
  return (
    <div className="bg-[#F0F0F0]">
      <div className="flex justify-center algin-center">
        <div className="w-[72%]">
          <div className="flex p-3">
            <CustomSwiper />
            <div className="ml-[8px]">
              <Link href="all-product">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/TrangUuDaiKhoTienMatT12_392x156_1.jpg"
                  alt=""
                ></img>
              </Link>
              <Link href="all-product">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/392x156_vnpay_ngay_sale_t11.png"
                  alt=""
                  className="mt-[4px]"
                ></img>
              </Link>
            </div>
          </div>
          <div className="flex mt-2 justify-between">
            <div>
              <Link href="all-product">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/ctthang12_xakho_310x210.jpg"
                  alt=""
                  className="w-[95%]"
                ></img>
              </Link>
            </div>
            <div>
              <Link href="all-product">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/LDPScholastic_Resizehomepage_310x210_1.png"
                  alt=""
                  className="w-[95%]"
                ></img>
              </Link>
            </div>
            <div>
              <Link href="all-product">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/LDPScholastic_Resizehomepage_310x210_1.png"
                  alt=""
                  className="w-[95%]"
                ></img>
              </Link>
            </div>
            <div>
              <Link href="all-product">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/SmallBanner_T12_310x210.png"
                  alt=""
                  className="w-[100%]"
                ></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
