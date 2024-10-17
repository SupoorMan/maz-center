import axios from "axios";
import { ref } from "vue";

const token = ref("");

// 创建一个 axios 实例
const service = axios.create({
  baseURL: "http://127.0.0.1:8118/manage", // 所有的请求地址前缀部分
  timeout: 30000, // 请求超时时间毫秒
  withCredentials: true, // 异步请求携带cookie
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/json",
    token: token.value,
    "Access-Control-Allow-Origin": "*",
  },
});


// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    // console.log('请求错误:' + error)
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    //console.log(response)
    token.value = response.headers.token;
    return response.data;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
export default service;
