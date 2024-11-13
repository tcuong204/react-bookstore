import { Divider } from "antd";

export default function Footer() {
  return (
    <>
      <div className="w-full bg-[#ccc] flex justify-center ">
        <div className="flex justify-center bg-[#fff] w-[70%] rounded-lg p-4">
          <div>
            <img
              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/vip/ico_vip_copper.svg"
              alt="logo"
            ></img>
          </div>
          <Divider type="vertical" style={{ height: 200 }} />
          <h2 className="px-[4em]">DỊCH VỤ</h2>
          <h2 className="px-[4em]">HỖ TRỢ</h2>
          <h2 className="px-[4em]">TÀI KHOẢN CỦA TÔI</h2>
        </div>
      </div>
    </>
  );
}
