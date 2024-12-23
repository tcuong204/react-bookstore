import axiosInstance from "@/axios/axiosConfig";
import { CustomButton } from "@/utils/CustomButton";
import {
  formatDateTime,
  getAllOrders,
  getLabelStatus,
  Order,
  OrdersData,
} from "@/utils/OrdersUtils";
import { useUser } from "@/utils/UserContext";
import { Divider, message, Modal, Radio } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
const MyOrders = () => {
  const { user, setUser } = useUser();
  const [orders, setOrders] = useState<Order[]>();
  const [status, setStatus] = useState<
    "" | "processing" | "shipping" | "returned"
  >("");
  const [orderId, setOrderId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = (id: number) => {
    setOrderId(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const res = await axiosInstance
      .get("cancel-order?orderCode=" + orderId)
      .then((res) => {
        if (res.status === 200) {
          messageApi.success("Hủy đơn hàng thành công");
          setIsModalOpen(false);
          getOrder();
        } else {
          messageApi.error("Hủy đơn hàng không thành công");
        }
      });
  };

  const handleCancel = () => {
    setOrderId(undefined);
    setIsModalOpen(false);
  };
  const getOrder = async () => {
    const data = await getAllOrders(status, user?.id);
    if (data) {
      setOrders(data);
    }
  };
  useEffect(() => {
    getOrder();
  }, [status, user]);
  return (
    <div>
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
      {orders?.length === 0 ? (
        <div className="h-[600px] bg-[#fff] flex items-center justify-center">
          <div className="">
            <div className="flex items-center justify-center">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg"
                width={100}
                height={100}
              ></img>
            </div>
            <div>
              <p className="">Bạn chưa có đơn hàng nào</p>
            </div>
          </div>
        </div>
      ) : (
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
                    <p className="text-[14px]">
                      {getLabelStatus(array?.status)}
                    </p>
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
                  </div>
                </div>
              </Link>
              {array.status === "processing" && (
                <div className="flex justify-end">
                  <CustomButton
                    className=""
                    onClick={() => showModal(array.orderCode)}
                    buttonText="Hủy đơn hàng"
                    buttonType="default"
                    disabled={false}
                    htmlType="button"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <Modal
        title="Xác nhận hủy"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn chắc chắn muốn hủy đơn hàng</p>
      </Modal>
      {contextHolder}
    </div>
  );
};

export default MyOrders;
