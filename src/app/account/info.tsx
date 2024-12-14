import { User } from "@/utils/Auth";
import { Input } from "antd";

const UserInfo = (user: User) => {
  return (
    <>
      <b>Hồ sơ cá nhân</b>
      <div className="flex">
        <span>Họ</span>
        <Input value={user.firstName} />
      </div>
      <div className="flex">
        <span>Tên</span>
        <Input value={user.lastName} />
      </div>
      <div className="flex">
        <span>Số điện thoại</span>
        <Input value={user.phoneNumber} />
      </div>
    </>
  );
};
export default UserInfo;
