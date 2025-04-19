//need to change
import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data;
};

export const registerUser = async (userInfo) => {
  const { data } = await axiosInstance.post("/auth/register", userInfo);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};
