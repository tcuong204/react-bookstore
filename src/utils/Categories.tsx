import axiosInstance from "@/axios/axiosConfig";

export interface CategoriesResponse {
  message: string;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  topics: Topic[];
}

export interface Topic {
  id: number;
  name: string;
  imageUrl: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  categoryId: number;
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string | null;
  imageUrl: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  topicId: number;
}
export const getAllCategories = async () => {
  let data;
  const res = await axiosInstance
    .get("get-all-categories")
    .then((res) => (data = res.data));
  return data;
};
