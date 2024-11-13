import { useRouter } from "next/router";

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
export const logout = () => {
  // const router = useRouter()
  if (typeof window !== "undefined") {
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    // Tùy chọn: điều hướng người dùng về trang đăng nhập hoặc trang chủ
    window.location.href = "/"; // Hoặc dùng router push trong Next.js
  }
};
