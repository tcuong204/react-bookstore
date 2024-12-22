import axiosInstance from "@/axios/axiosConfig";

export interface OrderDetailResponse {
  message: string;
  order: DetailOrder;
}

export interface DetailOrder {
  orderCode: number;
  status: string;
  orderDate: string; // ISO date string
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  shippingFee: number;
  total: number;
  note: string | null;
  address: Address;
  products: Product[];
}
interface Address {
  id: number;
  recipientName: string;
  phoneNumber: string;
  city: string;
  district: string;
  ward: string;
  addressDetail: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

export interface Order {
  orderCode: number;
  status: "returned" | "processing" | "shipping";
  orderDate: string;
  paymentMethod: "bank_transfer" | "cash_on_delivery";
  paymentStatus: "unpaid" | "paid";
  totalAmount: number | null;
  shippingFee: number | null;
  total: number | null;
  note: string | null;
  address: Address;
  product: Product;
  totalProducts: number;
}

export interface OrdersData {
  orders: Order[];
}
export const getAllOrders = async (
  status: "" | "processing" | "shipping" | "returned"
) => {
  let data;
  const res = await axiosInstance
    .get("/get-my-orders?userId=1&status=" + status)
    .then((res) => {
      data = res.data.orders;
    });
  return data;
};
export const getOrderbyId = async (id: number) => {
  let data;
  const res = await axiosInstance
    .get("/get-my-order-by-id?orderId=" + id)
    .then((res) => {
      data = res.data;
    });
  return data;
};
export const formatDateTime = (dateTime: string): string => {
  const date = new Date(dateTime);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};
export const Allstatus = [
  {
    label: "Đang xử lí",
    value: "processing",
    color: "#00cbff",
  },
  {
    label: "Đang vận chuyển",
    value: "shipping",
    color: "#00ff77",
  },
  {
    label: "Đã hủy",
    value: "returned",
    color: "#ff005d",
  },
];
export const getLabelStatus = (
  value: "processing" | "shipping" | "returned"
) => {
  return Allstatus.filter((a) => a.value === value).map((a, index) => (
    <div key={index} className={`bg-[${a.color}] ml-[1rem] rounded-lg px-1`}>
      {a.label}
    </div>
  ));
};
