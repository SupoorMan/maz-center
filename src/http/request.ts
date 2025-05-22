import router from "@/router";
import { cacheStore, getCache } from "@/stores/cache";
import { securityStore } from "@/stores/security";
import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { ElMessage } from "element-plus";
import { RequestActive } from "./Clazz";

// 创建一个 axios 实例
const service = axios.create({
  baseURL: "https://127.0.0.1:443", // 所有的请求地址前缀部分
  timeout: 50000, // 请求超时时间毫秒
  withCredentials: true, // 异步请求携带cookie
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    //"Access-Control-Allow-Origin": "*",
    "X-Request-With": "XMLHttpRequest",
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  function (request) {
    //start_log(request);
    request.headers.set("authorization", securityStore().token);
    return request;
  },
  function (error) {
    ElMessage.error("请求:" + error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    //end_log(response);

    if (response.headers.token) {
      securityStore().token = response.headers.authorization;
    }
    if (response.data.code == 401) {
      ElMessage({
        type: "success",
        message: response.data.message,
      });

      const security = securityStore();
      security.logged = false;

      router.push("/login");
    }
    return response.data;
  },
  function (error) {
    ElMessage.error("服务器正在维护中,请稍后再试!");
    return Promise.reject(error);
  }
);

const start_log = async (request: InternalAxiosRequestConfig) => {
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

const end_log = async (response: AxiosResponse) => {
  const cache = cacheStore();
  for (let i = cache.active.length - 1; i >= 0; i--) {
    if (cache.active[i].point == response.config.url) {
      cache.active[i].data = response.data;
      break;
    }
  }
  if (response.data.code === 330781) {
    console.log("读取 --- 缓存数据");
    response.data = getCache(response.config.url as string)?.data;
  }
};
export default service;
