"use client";
import DeliveryAddress from "@/Components/Account/address";
import MyOrders from "@/Components/Account/orders";
import { useParams } from "next/navigation";

const AccountParamPage = () => {
  const params = useParams();
  const param = params?.param;
  const renderContent = () => {
    switch (param) {
      case "user-info":
        return <MyOrders />;
      case "address":
        return <DeliveryAddress />;
      case "orders":
        return <MyOrders />;
      default:
        return <div>Nội dung không tồn tại.</div>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default AccountParamPage;
