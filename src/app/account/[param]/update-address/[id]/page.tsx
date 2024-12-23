"use client";
import axiosInstance from "@/axios/axiosConfig";
import { Address, getAddressbyId } from "@/utils/AddressUtils";
import { getUser, User } from "@/utils/Auth";
import { CustomButton } from "@/utils/CustomButton";
import {
  Button,
  Checkbox,
  CheckboxProps,
  Form,
  FormProps,
  Input,
  message,
  Select,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const onFinishFailed: FormProps<Address>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function UpdateAddress() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const param = useParams();
  const [address, setAddress] = useState<Address | null>(null);
  const [checked, setChecked] = useState<true | false>(false);
  const GetDetailAddress = async () => {
    const data = await getAddressbyId(Number(param.id));
    form.setFieldsValue({
      recipientName: data?.recipientName,
      ward: data?.ward,
      phoneNumber: data?.phoneNumber,
      city: data?.city,
      district: data?.district,
      addressDetail: data?.addressDetail,
    });
    setChecked(data?.isDefault);
    if (data) {
      setAddress(data);
    }
  };

  const onFinish: FormProps<Address>["onFinish"] = async (values) => {
    const body = { ...values, addressId: address?.id, isDefault: checked };
    try {
      const res = await axiosInstance.patch("/edit-address", body);
      console.log(res);

      if (res.status === 200) {
        messageApi.success("Thêm địa chỉ thành công");
        setTimeout(() => {
          router.back();
        }, 1000);
      } else {
        messageApi.error("Thêm địa chỉ không thành công");
      }
    } catch {
    } finally {
    }
  };
  useEffect(() => {
    GetDetailAddress();
  }, []);
  return (
    <div className="p-4">
      <div className="p-4 bg-[#fff]">
        <div className="flex justify-center">
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
            <Form.Item<Address>
              label="Tên người nhận"
              name="recipientName"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<Address>
              label="SĐT"
              name="phoneNumber"
              rules={[{ required: true, message: "Vui lòng nhập sđt!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<Address>
              label="Thành phố"
              name="city"
              rules={[{ required: true, message: "Vui lòng nhập thành phố!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<Address>
              label="Huyện"
              name="district"
              rules={[{ required: true, message: "Vui lòng nhập huyện!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<Address>
              label="Xã"
              name="ward"
              rules={[{ required: true, message: "Vui lòng nhập Xã!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<Address>
              label="Địa chỉ"
              name="addressDetail"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input />
            </Form.Item>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="ml-[33%]"
            >
              Chọn làm địa chỉ mặc định
            </Checkbox>

            <Form.Item label={null} className="ml-[50%]">
              <CustomButton
                className=""
                onClick={() => router.back()}
                buttonText="Hủy"
                buttonType="default"
                disabled={false}
                htmlType="button"
              />
              <CustomButton
                className="ml-[1rem]"
                onClick={() => console.log("")}
                buttonText="Xác nhận"
                buttonType="primary"
                disabled={false}
                htmlType="submit"
              />
            </Form.Item>
          </Form>
        </div>
      </div>
      {contextHolder}
    </div>
  );
}
