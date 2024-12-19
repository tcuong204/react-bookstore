"use client";

import { getAddress } from "@/utils/AddressUtils";
import { Divider } from "antd";
import { Address } from "cluster";
import { useEffect, useState } from "react";

const DeliveryAddress = () => {
  const [address, setAddress] = useState<Address[] | null>(null);
  const getAddressUser = async () => {
    const data = await getAddress();
    if (data) {
      setAddress(data);
    }
  };
  useEffect(() => {
    getAddressUser();
  }, []);
  console.log(address);

  return (
    <div className="font-nunito">
      <div className="py-4 flex justify-between">
        <b className="text-[#565555] text-[20px] font-[600]">Sổ địa chỉ</b>
        <div className="px-[1rem]">
          <span className="text-[#2489F4] text-[16px] ">
            + Thêm địa chỉ mới
          </span>
        </div>
      </div>
      {address?.map((arr, index) => (
        <div className="flex justify-between">
          <div className="font-nunito">
            <div className="font-bold flex items-center">
              <span className="text-[13px] font-bold text-grayText">
                {arr.recipientName}
              </span>
              <Divider type="vertical" />
              <b>{arr.phoneNumber}</b>
              <div className="ml-[0.5rem] font-[400]">
                {arr.isDefault && (
                  <span className="text-[#2489F4] text-[14px] bg-[#D7E7FD] px-1 rounded-md">
                    Địa chỉ mặc định
                  </span>
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
          <div className="px-[2rem]">
            <span className="text-[#2489F4] text-[16px] ">Sửa</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryAddress;
