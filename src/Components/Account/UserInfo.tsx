import axiosInstance from "@/axios/axiosConfig";
import { getUser, User } from "@/utils/Auth";
import { CustomButton } from "@/utils/CustomButton";
import { Form, FormProps, Input, message, Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type FieldType = {
  id: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  userType?: "customer" | "admin";
};
const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const UserInfo = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const GetDetailUser = async () => {
    const data = await getUser();
    if (data) {
      form.setFieldsValue({
        id: data?.id,
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
      });
      setUser(data);
    }
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const body = { ...values, id: user?.id };
    try {
      const res = await axiosInstance.patch("/edit-user", body);
      if (res.status === 200) {
        messageApi.success("Sửa người dùng thành công");
        // setTimeout(() => {
        //   router.back();
        // }, 1000);
      } else {
        messageApi.error("Sửa người dùng không thành công");
      }
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    GetDetailUser();
  }, []);
  return (
    <>
      <div className="py-[1rem]">
        <b>Hồ sơ cá nhân</b>
      </div>
      <div className="">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 700 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="Họ" name="firstName">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Tên" name="lastName">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="SĐT" name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label={null} className="ml-[50%]">
            <CustomButton
              className=""
              onClick={() => console.log()}
              buttonText="Lưu thông tin"
              buttonType="primary"
              disabled={false}
              htmlType="submit"
            />
          </Form.Item>
        </Form>
      </div>
      {contextHolder}
    </>
  );
};
export default UserInfo;
