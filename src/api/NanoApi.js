import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL2,
  //   responseType: "json",
  //   contentType: "application/json",
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // localStorage.removeItem("token");
      // localStorage.removeItem("user");
      // window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
