import axiosInstance from "@/axios/axiosConfig";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: boolean; // true: male, false: female
  isLogin: boolean;
  phoneNumber: string;
  profileImage: string | null; // null if no image
}

export const isLoggedIn = (): boolean => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token !== null;
    console.log("token", token);
  }
  return false; // Khi render phía server
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null; // Khi render phía server
};
export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    return;
  }
  let data;
  try {
    const response = await axiosInstance
      .get("/getUserInfo", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        data = response.data.userData;
      })
      .catch();
  } catch {
  } finally {
    return data;
  }
};
export const logout = () => {
  // const router = useRouter()
  if (typeof window !== "undefined") {
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    // Tùy chọn: điều hướng người dùng về trang đăng nhập hoặc trang chủ
    window.location.href = "/"; // Hoặc dùng router push trong Next.js
  }
};
