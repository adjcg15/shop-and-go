import axios from "axios";

const shopAndGoAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000
});

shopAndGoAPI.interceptors.response.use(
  (response) => {
    const newToken = response.headers["Set-Authorization"];
    if (newToken) {
      // TODO: update new token
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default shopAndGoAPI;