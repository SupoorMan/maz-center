import request from "./request";

class Param {}

export const postTXZ = (param: any) => {
  return request.request({
    url: "/security/txz", //请求的接口路径
    method: "post", //请求方法
    headers: {
      action: "login:" + new Date().getTime(),
    },
    data: {
      code: Math.floor(Math.random() * 1000000) + 1,
      platform: 'manage',
      version: '1.0.1',
      timestamp: new Date().getTime()
    },
  });
};

export const postLogin = (param: any) => {
  return request.request({
    url: "/security/login", //请求的接口路径
    method: "post", //请求方法
    headers: {
      action: "login:" + new Date().getTime(),
    },
    data: param,
  });
};
