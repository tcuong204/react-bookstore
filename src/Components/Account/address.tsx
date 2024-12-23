"use client";

import { Address, getAddress } from "@/utils/AddressUtils";
import { getUser, User } from "@/utils/Auth";
import { useUser } from "@/utils/UserContext";
import { Divider, Tag } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeliveryAddress = () => {
  const [address, setAddress] = useState<Address[] | null>(null);
  const router = useRouter();
  const { user, setUser } = useUser();
  const getAddressUser = async () => {
    const data = await getAddress(user?.id);
    if (data) {
      setAddress(data);
    }
  };
  useEffect(() => {
    if (address?.length === 0) {
      router.push("address/create-address");
    }
    getAddressUser();
  }, [user]);
  return (
    <div className="font-nunito">
      <div className="py-4 flex justify-between">
        <b className="text-[#565555] text-[20px] font-[600]">Sổ địa chỉ</b>
        <div className="px-[1rem]">
          <Link href="address/create-address">
            <span className="text-[#2489F4] text-[16px]">
              + Thêm địa chỉ mới
            </span>
          </Link>
        </div>
      </div>
      {address?.length === 0 ? (
        <div>Bạn chưa có địa chỉ</div>
      ) : (
        address?.map((arr, index) => (
          <div key={index} className="flex justify-between">
            <div className="font-nunito">
              <div className="font-bold flex items-center">
                <span className="text-[13px] font-bold text-grayText">
                  {arr.recipientName}
                </span>
                <Divider type="vertical" />
                <span>{arr.phoneNumber}</span>
                <div className="ml-[0.5rem] font-[400]">
                  {arr.isDefault && (
                    <Tag color="geekblue" className=" text-[14px]  ">
                      Địa chỉ mặc định
                    </Tag>
                  )}
                </div>
              </div>
              <div>
                <span className="font-nunito text-[#7A7E7F] font-[400]">
                  {arr.addressDetail}
                </span>
              </div>
              <div>
                <span className="font-nunito text-[#7A7E7F] font-[400]">
                  {arr.ward},<span>{arr.district}, </span>
                  {arr.city}
                </span>
              </div>
            </div>
            <Link href={`address/update-address/${arr.id}`}>
              <div className="px-[2rem]">
                <span className="text-[#2489F4] text-[16px] ">Sửa</span>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default DeliveryAddress;
