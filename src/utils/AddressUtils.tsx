import axiosInstance from "@/axios/axiosConfig";
import exp from "constants";

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
export const getAddress = async (id: number | undefined) => {
  let data;
  const res = await axiosInstance
    .get("/get-address?userId=" + id)
    .then((res) => (data = res?.data?.address))
    .catch();
  return data;
};
export const getAddressbyId = async (id: number) => {
  let data;
  const res = await axiosInstance
    .get("get-address-by-id?addressId=" + id)
    .then((res) => (data = res.data.address));
  return data;
};
