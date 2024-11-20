import { getCache } from "@/stores/cache";
import request from "./request";

export const postCert = () => {
  let api = "/security/cert";

  let e = getCache(api);
  let value = null;
  if (e) {
    value = e.data.data;
  }

  request.request({
    url: api, //请求的接口路径
    method: "post", //请求方法
    data: {
      value: value,
      platform: "M",
      version: "M-1.0.1",
    },
  });
};

const check = (api: string) => {};

export const postLogin = (param: any) => {
  let login = request.request({
    url: "/security/login", //请求的接口路径
    method: "post", //请求方法
    data: param,
  });

  return login;
};

export const testAPIs = () => {
  return request.request({
    url: "/token", //请求的接口路径
    method: "post", //请求方法
    data: null,
  });
};
