"use client";
import axiosInstance from "@/axios/axiosConfig";
import { CustomButton } from "@/utils/CustomButton";
import { Result } from "antd";
import { useRouter } from "next/navigation";

export default function FailedNoti() {
  const router = useRouter();
  return (
    <>
      <div className="bg-[#F0F0F0]  min-h-[650px]">
        <div className="flex justify-center">
          <div className="bg-[#fff] w-[72%] p-4 mt-4">
            <Result
              status="error"
              title="Mua hàng không thành công"
              subTitle="Đã có lỗi bất ngờ xảy ra"
              extra={[
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
