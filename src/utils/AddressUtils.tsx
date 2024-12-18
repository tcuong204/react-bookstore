import axiosInstance from "@/axios/axiosConfig";

export interface Address {
  id: number;
  recipientName: string;
  phoneNumber: string;
  city: string;
  district: string;
  ward: string;
  addressDetail: string;
  isDefault: boolean;
  userId: number;
}
export interface ListAddress {
  listAddress: Address[];
}
export const getAddress = async () => {
  let data;
  const res = await axiosInstance
    .get("/get-address?userId=1")
    .then((res) => (data = res?.data?.address))
    .catch();
  return data;
};
