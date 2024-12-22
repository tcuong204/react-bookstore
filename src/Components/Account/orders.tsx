import { CustomButton } from "@/utils/CustomButton";
import {
  formatDateTime,
  getAllOrders,
  getLabelStatus,
  Order,
  OrdersData,
} from "@/utils/OrdersUtils";
import { Divider, Radio } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>();
  const [status, setStatus] = useState<
    "" | "processing" | "shipping" | "returned"
  >("");
  const getOrder = async () => {
    const data = await getAllOrders(status);
    if (data) {
      setOrders(data);
    }
  };

  useEffect(() => {
    getOrder();
  }, [status]);
  console.log(orders?.map((a) => a.product)[1]);

  return (
    <>
      <div className="p-4 ">
        <Radio.Group
          defaultValue=""
          buttonStyle="solid"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <Radio.Button value="">Tất cả</Radio.Button>
          <Radio.Button value="processing">Đang xử lí</Radio.Button>
          <Radio.Button value="shipping">Đang vận chuyển</Radio.Button>
          <Radio.Button value="returned">Đã hủy</Radio.Button>
        </Radio.Group>
      </div>
      <div className="bg-[#ccc] py-[0.5rem] overflow-auto h-[600px]">
        {orders?.map((array, index) => (
          <div
            className="font-nunito m-4 rounded-lg bg-[#fff] p-4 hover:bg-[#eee]"
            key={index}
          >
            <Link href={`orders/detail-order/${array.orderCode}`}>
              <div className="flex justify-between ">
                <div className="flex">
                  <p className="text-[#00cbff]">#{array.orderCode}</p>
                  <p className="text-[14px]">{getLabelStatus(array?.status)}</p>
                </div>
                <div className="text-[#ccc] text-[14px]">
                  {formatDateTime(array.orderDate)}
                </div>
              </div>
              <Divider style={{ marginTop: 16, marginBottom: 8 }} />
              <div className="flex">
                <div>
                  <img width={100} src={array.product.image}></img>
                </div>
                <div className="flex items-center">{array.product.name}</div>
              </div>
              <Divider style={{ marginTop: 16, marginBottom: 8 }} />
              <div className="flex justify-between">
                <div className="text-[#ccc] text-[14px] flex items-center">
                  <p>{array.totalProducts} Sản phẩm</p>
                </div>
                <div>
                  <div className="flex my-[0.5rem]">
                    <span>Tổng số tiền:</span>
                    <b>{array.totalAmount?.toLocaleString("en-US")}đ</b>
                  </div>
                  {array.status === "processing" && (
                    <CustomButton
                      className=""
                      onClick={() => console.log()}
                      buttonText="Hủy đơn hàng"
                      buttonType="default"
                      disabled={false}
                      htmlType="button"
                    />
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyOrders;
