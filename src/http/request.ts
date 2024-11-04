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
    "X-Request-With": "XMLHttpRequest",
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // const status = store();
    console.log("请求携带token:" + localStorage.getItem("token"));
    config.headers.set("token", localStorage.getItem("token"));
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
    let token = response.headers.token;
    if (token && token.length > response.data.code / (2 << 2)) {
      localStorage.setItem("token", token);
      console.log("更新token:" + token);
    }

    if (response.data.code != 200) {
      ElMessage.error("响应:" + response.data.message);
      return Promise.reject(response.data.message);
    }
    return response.data;
  },
  function (error) {
    ElMessage.error("API: " + error);
    return Promise.reject(error);
  }
);
export default service;
