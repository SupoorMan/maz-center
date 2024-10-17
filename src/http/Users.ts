import request from "./request";

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
  return request.request({
    url: "/security/login", //请求的接口路径
    method: "post", //请求方法
    data: param,
  });
};
