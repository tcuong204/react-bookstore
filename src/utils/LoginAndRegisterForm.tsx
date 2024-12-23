import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  message,
  Radio,
  Tabs,
} from "antd";
import { useEffect, useState } from "react";
import { CustomButton } from "./CustomButton";
import TabPane from "antd/es/tabs/TabPane";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import axios from "axios";
import axiosInstance from "../axios/axiosConfig";
import { useRouter } from "next/navigation";
interface Values {
  email: string;
  password: string;
}

interface LoginAndRegisterFormProps {
  setOpenPopup: () => void;
  tabKey: string | undefined;
}
export const LoginAndRegisterForm: React.FC<LoginAndRegisterFormProps> = ({
  setOpenPopup,
  tabKey,
}) => {
  const [passwordVisible, setPasswordVisible] = useState<true | false>(true);
  const form = Form.useForm();
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    const body = JSON.stringify(values, null, 2);
    const response = await axiosInstance
      .post("/login", body)
      .then((response) => {
        const res = response;

        if (res.status === 200) {
          messageApi.success("Đăng nhập thành công");
          window.localStorage.setItem("token", response?.data?.token);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          messageApi.error("Đăng nhập không thành công");
        }
      })
      .catch((error) => {
        messageApi.error("Đăng nhập không thành công");
      });
  };
  const handleRegister = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    const body = JSON.stringify(values, null, 2);
    const response = await axiosInstance.post("/create-new-user", body);
    if (response.status === 201) {
      const response = await axiosInstance
        .post("/login", body)
        .then((response) => {
          const res = response;

          if (res.status === 200) {
            messageApi.success("Đăng kí thành công");
            window.localStorage.setItem("token", response?.data?.token);
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          } else {
            messageApi.error("Đăng kí không thành công");
          }
        })
        .catch((error) => {
          messageApi.error("Đăng kí không thành công");
        });
    }
  };
  const tabItems = [
    {
      key: "1",
      label: (
        <span style={{ color: "#C62027", fontFamily: "Nunito" }}>
          Đăng nhập
        </span>
      ),
      children: (
        // Nội dung Tab Đăng nhập
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
              .required("Vui lòng nhập email"),
            password: Yup.string()
              .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
              .required("Vui lòng nhập mật khẩu"),
          })}
          validateOnMount={true}
        >
          {(props) => (
            <Form onFinish={props.handleSubmit}>
              <Form.Item
                layout="vertical"
                label="Số điện thoại/Email"
                className="p-4"
                name="name"
              >
                <Input
                  size="large"
                  name="name"
                  onChange={(e) => {
                    props.values.email = e.target.value;
                    props.validateForm();
                  }}
                  value={props.values.email}
                  placeholder="Nhập số điện thoại hoặc email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                layout="vertical"
                className="p-4"
              >
                <Input.Password
                  size="large"
                  name="password"
                  value={props.values.password}
                  onChange={(e) => {
                    props.values.password = e.target.value;
                    props.validateForm();
                  }}
                  placeholder="Nhập mật khẩu"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  visibilityToggle={passwordVisible}
                  autoComplete="new-password"
                />
              </Form.Item>
              <div style={{ textAlign: "right", marginBottom: "16px" }}>
                <a style={{ color: "#C62027" }}>Quên mật khẩu?</a>
              </div>
              <Form.Item className="flex justify-center items-center">
                <CustomButton
                  buttonType="primary"
                  htmlType="submit"
                  className="px-[4rem] text-[1.1em] font-600"
                  buttonText="Đăng nhập"
                  disabled={!props.isValid}
                  onClick={() => console.log("clicked", props.isValid)}
                />
              </Form.Item>
              <Form.Item className="flex justify-center items-center">
                <CustomButton
                  buttonType="default"
                  htmlType="button"
                  className="w-64 text-[1.1em] font-semibold"
                  buttonText="Bỏ qua"
                  disabled={false}
                  onClick={() => {
                    props.resetForm();
                    setOpenPopup();
                  }}
                />
              </Form.Item>
            </Form>
          )}
        </Formik>
      ),
    },
    {
      key: "2",
      label: <span style={{ color: "#C62027" }}>Đăng ký</span>,
      children: (
        // Nội dung Tab Đăng ký
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleRegister}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
              .required("Vui lòng nhập email"),
            password: Yup.string()
              .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
              .required("Vui lòng nhập mật khẩu"),
          })}
          validateOnMount={true}
        >
          {(props) => (
            <Form onFinish={props.handleSubmit}>
              <Form.Item
                layout="vertical"
                label="Số điện thoại/Email"
                className="p-4"
                name="name"
              >
                <Input
                  size="large"
                  name="name"
                  onChange={(e) => {
                    props.values.email = e.target.value;
                    props.validateForm();
                  }}
                  value={props.values.email}
                  placeholder="Nhập số điện thoại hoặc email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                layout="vertical"
                className="p-4"
              >
                <Input.Password
                  size="large"
                  name="password"
                  value={props.values.password}
                  onChange={(e) => {
                    props.values.password = e.target.value;
                    props.validateForm();
                  }}
                  placeholder="Nhập mật khẩu"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  visibilityToggle={passwordVisible}
                  autoComplete="new-password"
                />
              </Form.Item>
              <div style={{ textAlign: "right", marginBottom: "16px" }}>
                <a style={{ color: "#C62027" }}>Quên mật khẩu?</a>
              </div>
              <Form.Item className="flex justify-center items-center">
                <CustomButton
                  buttonType="primary"
                  htmlType="submit"
                  className="px-[4rem] text-[1.1em] font-600"
                  buttonText="Đăng ký"
                  disabled={!props.isValid}
                  onClick={() => console.log("clicked", props.isValid)}
                />
              </Form.Item>
              <Form.Item className="flex justify-center items-center">
                <CustomButton
                  buttonType="default"
                  htmlType="button"
                  className="w-64 text-[1.1em] font-semibold"
                  buttonText="Bỏ qua"
                  disabled={false}
                  onClick={() => {
                    props.resetForm();
                    setOpenPopup();
                  }}
                />
              </Form.Item>
            </Form>
          )}
        </Formik>
      ),
    },
  ];
  console.log(tabKey);
  return (
    <>
      <ConfigProvider
        theme={{ components: { Tabs: { inkBarColor: "#C62027" } } }}
      >
        <Tabs activeKey={tabKey} centered items={tabItems} />
      </ConfigProvider>
      {contextHolder}
    </>
  );
};
