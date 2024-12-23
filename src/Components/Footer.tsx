import { Divider } from "antd";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="w-full bg-[#F0F0F0] flex justify-center ">
        <div className="flex  bg-[#fff] w-[72%] rounded-lg p-4 mt-[2rem]">
          <div className="flex justify-center items-center w-[30%]">
            <Link href="/">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png"
                width={220}
                alt=""
              />
            </Link>
          </div>
          <Divider type="vertical" style={{ height: 200 }} />
          <div className="w-[30%] font-serif ">
            <div>
              <h2 className="flex justify-center">DỊCH VỤ</h2>
            </div>
            <div className="flex justify-center py-[1rem]"></div>
            <div className="flex justify-center pb-[1rem]">
              <div className="hover:translate-x-6 transition delay-0 duration-300 ease-in ">
                <Link href="/shopping-cart" className="text-[#000]">
                  <h6 className="hover:text-[#ea7696]">Chuyển đến sản phẩm</h6>
                </Link>
              </div>
            </div>
            <div className="flex justify-center pb-[1rem] ">
              <div className="hover:translate-x-6 transition delay-0 duration-300 ease-in ">
                <Link href="#hot-deal" className="text-[#000]">
                  <h6 className="hover:text-[#ea7696]">Xu hướng mua sắm</h6>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[30%] font-serif ">
            <div>
              <h2 className="flex justify-center">Tài khoản của tôi</h2>
            </div>
            <div className="flex justify-center py-[1rem]">
              <div className="hover:translate-x-6 transition delay-0 duration-300 ease-in ">
                <Link href="/shopping-cart" className="text-[#000]">
                  <h6 className="hover:text-[#ea7696]">
                    Đăng nhập/Tạo mới tài khoản
                  </h6>
                </Link>
              </div>
            </div>
            <div className="flex justify-center pb-[1rem]">
              <div className="hover:translate-x-6 transition delay-0 duration-300 ease-in ">
                <Link href="/account" className="text-[#000]">
                  <h6 className="hover:text-[#ea7696]">Chi tiết tài khoản</h6>
                </Link>
              </div>
            </div>
            <div className="flex justify-center pb-[1rem]">
              <div className="hover:translate-x-6 transition delay-0 duration-300 ease-in ">
                <Link href="/account/address" className="text-[#000]">
                  <h6 className="hover:text-[#ea7696]">Thay đổi địa chỉ</h6>
                </Link>
              </div>
            </div>
            <div className="flex justify-center pb-[1rem]">
              <div className="hover:translate-x-6 transition delay-0 duration-300 ease-in ">
                <Link href="/account/orders" className="text-[#000]">
                  <h6 className="hover:text-[#ea7696]">Lịch sử mua hàng</h6>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
