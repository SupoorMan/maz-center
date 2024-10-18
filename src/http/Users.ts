import request from "./request";
import { store } from "@/stores/status";

export const postCert = (code: string) => {
  return request.request({
    url: "/security/cert", //请求的接口路径
    method: "post", //请求方法
    data: {
      code: code,
      platform: "M",
      version: "M-1.0.1",
      // timestamp: timestamp,
    },
  });
};

export const postLogin = (param: any) => {
  let login = request.request({
    url: "/security/login", //请求的接口路径
    method: "post", //请求方法
    data: param,
  });

  return login;
};
