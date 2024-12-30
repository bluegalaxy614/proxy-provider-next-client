import axios from "axios";

const baseURL = "/api/v1";

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        return Promise.reject(error);
      } else {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
