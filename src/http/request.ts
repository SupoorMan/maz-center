import { store } from "@/stores/status";
import axios from "axios";
import { ElMessage } from "element-plus";
import { ref } from "vue";

// 创建一个 axios 实例
const service = axios.create({
  baseURL: "https://127.0.0.1:443/manage", // 所有的请求地址前缀部分
  timeout: 30000, // 请求超时时间毫秒
  withCredentials: true, // 异步请求携带cookie
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    // "Access-Control-Allow-Origin": "*",
    "X-Request-With": "XMLHttpRequest"
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    const status = store();
    config.headers.set("token", status.token);
    return config;
  },
  function (error) {
    ElMessage.error("请求:" + error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    if (response.config.url == "/security/login") {
      const status = store();
      status.token = response.headers.token;
    }
    return response.data;
  },
  function (error) {
    ElMessage.error("响应:" + error);
    return Promise.reject(error);
  }
);
export default service;
