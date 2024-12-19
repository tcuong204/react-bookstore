import { User } from "@/utils/Auth";
import { Input } from "antd";

const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <>
      <div className="py-[1rem]">
        <b>Hồ sơ cá nhân</b>
      </div>
      <div className="flex w-[80%] p-2 items-center">
        <div className="w-[15%]">
          <span>Họ</span>
        </div>
        <Input value={user?.firstName} />
      </div>
      <div className="flex w-[80%] p-2 items-center">
        <div className="w-[15%]">
          <span>Tên</span>
        </div>
        <Input value={user?.lastName} />
      </div>
      <div className="flex w-[80%] p-2 items-center">
        <div className="w-[15%]">
          <span>Số điện thoại</span>
        </div>
        <Input value={user?.phoneNumber} />
      </div>
    </>
  );
};
export default UserInfo;
