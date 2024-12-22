"use client";

import {
  formatDateTime,
  getLabelStatus,
  getOrderbyId,
  OrderDetailResponse,
} from "@/utils/OrdersUtils";
import { Divider } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailOrder() {
  const [detailOrder, setDetailOrder] = useState<OrderDetailResponse>();
  const param = useParams();
  console.log(param);
  const getDetailOrder = async () => {
    const data = await getOrderbyId(param.id);
    if (data) {
      setDetailOrder(data);
    }
  };
  console.log(detailOrder);
  useEffect(() => {
    getDetailOrder();
  }, []);
  return (
    <>
      <div className="p-4 bg-[#ccc] font-nunito">
        <div className="rounded-lg bg-[#fff]   p-4">
          <div className="flex justify-between ">
            <div className="flex ">
              <p className="text-[#00cbff]">#{detailOrder?.order.orderCode}</p>
              <p className="text-[14px]">
                {getLabelStatus(detailOrder?.order.status)}
              </p>
            </div>
            <div className="text-[#ccc] text-[14px]">
              {formatDateTime(detailOrder?.order.orderDate)}
            </div>
          </div>
          <div className="flex p-4">
            <div className="p-4 w-[33%] shadow-sm shadow-[#ccc] rounded-lg">
              <b>Thông tin người nhận</b>
              <div>
                <p>{detailOrder?.order.address.recipientName}</p>
                <p>Tel: {detailOrder?.order.address.phoneNumber}</p>
                <span>
                  {detailOrder?.order.address.addressDetail}
                  <span>, {detailOrder?.order.address.ward}</span>
                  <span>, {detailOrder?.order.address.district}</span>
                  <span>, {detailOrder?.order.address.city}</span>
                </span>
              </div>
            </div>
            <div className="p-4 w-[33%] shadow-sm shadow-[#ccc] rounded-lg  mx-[1rem]">
              <b>Phương thức thanh toán</b>
              <div>
                {detailOrder?.order.paymentMethod === "bank-tranfer" ? (
                  <p>Chuyển khoản</p>
                ) : (
                  <p>Thanh toán khi nhận hàng</p>
                )}
              </div>
            </div>
            <div className="p-4 w-[33%] shadow-sm shadow-[#ccc] rounded-lg">
              <b>Tổng tiền</b>
              <div>
                <div>
                  <span>Tạm tính: {detailOrder?.order.totalAmount}</span>
                </div>
                <div>
                  <span>Phí vận chuyển: {detailOrder?.order.shippingFee}</span>
                </div>
                <div>
                  <span>
                    Tổng tiền:{" "}
                    {detailOrder?.order.shippingFee +
                      detailOrder?.order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[1rem] bg-[#fff] rounded-lg p-4">
          <span>
            <b>Mã đơn hàng: {detailOrder?.order.orderCode}</b>
          </span>
          <div className="flex mt-[1rem]">
            <div className="text-[#bbb] w-[60%]">
              Sản phẩm({detailOrder?.order.products.length})
            </div>
            <div className="text-[#bbb] w-[10%]">Giá</div>
            <div className="text-[#bbb] w-[15%]">Số lượng</div>
            <div className="text-[#bbb] w-[15%]">Thành tiền</div>
          </div>
          {detailOrder?.order.products.map((arr, index) => (
            <div key={index}>
              <Divider style={{ margin: 0 }} />
              <div className="flex p-4">
                <div>
                  <img src={arr.image} width={100}></img>
                </div>
                <div className="w-[45%]">
                  <p>{arr.name}</p>
                </div>
                <div className="w-[15%]">
                  <p>{arr.price.toLocaleString("en-Us")}</p>
                  <p className="line-through text-[#ccc]">
                    {arr.originalPrice.toLocaleString("en-Us")}
                  </p>
                </div>
                <div className="w-[14%]">{arr.quantity}</div>
                <div className="w-[10%]">
                  <b>{arr.totalPrice.toLocaleString("en-Us")}</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
