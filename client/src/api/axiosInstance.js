import axios from "axios";

const BASE_URL = "https://netflix-jj9n.onrender.com/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
const handleUnauthorized = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("user");
    // window.location.href = "/signin";
  }
  return Promise.reject(error);
};
apiClient.interceptors.response.use(
  (response) => response,
  handleUnauthorized
);

export default apiClient;