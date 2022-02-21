import axios from "axios";

const URL = process.env.REACT_APP_API_URL;
const jwtToken = localStorage.getItem("jwt");

const axiosInterceptor = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
});

export default axiosInterceptor;
