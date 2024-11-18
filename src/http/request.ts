import { cacheStore } from "@/stores/cache";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { RequestActive } from "./Clazz";

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
  function (request) {
    apiLog(request);

    request.headers.set("token", localStorage.getItem("token"));
    return request;
  },
  function (error) {
    ElMessage.error("请求:" + error);
    return Promise.reject(error);
  }
);

const apiLog = (request: InternalAxiosRequestConfig) => {
  const e = new RequestActive();
  e.point = request.url as string;

  let xrt = 1;
  const cache = cacheStore();
  if (cache.active.length > 0) {
    let before = cache.active[cache.active.length - 1];
    if (before.point == request.url) {
      xrt = before.times = before.times + 1;
    } else {
      e.times = before.times + 1;
      cache.active.push(e);
    }
  } else {
    e.times = 1;
    cache.active.push(e);
  }

  request.headers.set("x-request-times", xrt);
};

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    let token = response.headers.token;
    if (token && token.length > response.data.code / (2 << 2)) {
      localStorage.setItem("token", token);
      console.log("更新token:" + token);
    }

    const cache = cacheStore();
    if (response.data.cache) {
      console.log("返回需要缓存数据");
      //store
      for (let i = cache.active.length - 1; i >= 0; i--) {
        if (cache.active[i].point == response.config.url) {
          cache.active[i].data = response.data;
          break;
        }
      }
    }
    if (response.data.code === 330781) {
      console.log("读取 --- 缓存数据");
      for (let i = cache.active.length - 1; i >= 0; i--) {
        if (cache.active[i].point == response.config.url) {
          response.data = cache.active[i].data;
          break;
        }
      }
    }
    return response.data;
  },
  function (error) {
    ElMessage.error("API: " + error);
    return Promise.reject(error);
  }
);
export default service;
