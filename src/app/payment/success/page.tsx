"use client";
import axiosInstance from "@/axios/axiosConfig";

import { CustomButton } from "@/utils/CustomButton";
import { Result } from "antd";
import { useRouter } from "next/navigation";

export default function SuccessNoti() {
  const router = useRouter();
  return (
    <>
      <div className="bg-[#F0F0F0]  min-h-[650px]">
        <div className="flex justify-center">
          <div className="bg-[#fff] w-[72%] p-4 mt-4">
            <Result
              status="success"
              title="Mua hàng thành công"
              subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                <CustomButton
                  className="w-[30%] "
                  onClick={() => router.push("/all-product")}
                  buttonText="Mua tiếp"
                  buttonType="primary"
                  disabled={false}
                  htmlType="button"
                />,
                <CustomButton
                  className="w-[30%] "
                  onClick={() => router.push("/")}
                  buttonText="Về trang chủ"
                  buttonType="default"
                  disabled={false}
                  htmlType="button"
                />,
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
