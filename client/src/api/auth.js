import axiosInstance from "./axiosInstance";

export const loginUser = async (formData) => {
  const response = await axiosInstance.post(
    "https://netflix-zguc.onrender.com/api/auth/login",
    formData,
    {
      withCredentials: true, 
    }
  );
  return response.data;
};

export const registerUser = async (userInfo) => {
  const { data } = await axiosInstance.post("/auth/register", userInfo, {
    withCredentials: true,
  });
  return data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me", {
    withCredentials: true,
  });
  return response.data;
};
