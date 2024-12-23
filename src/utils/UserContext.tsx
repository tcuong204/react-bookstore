"use client";
import React, { createContext, useContext, useState } from "react";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: boolean; // true: Male, false: Female (tùy vào ý nghĩa của boolean trong ngữ cảnh của bạn)
  isLogin: boolean;
  phoneNumber: string;
  profileImage: string | null; // null nếu không có ảnh
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng trong CartProvider");
  }
  return context;
};
