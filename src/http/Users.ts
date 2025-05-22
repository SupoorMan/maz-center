import { getCache } from "@/stores/cache";
import { securityStore } from "@/stores/security";
import axios from "axios";
import { Cert } from "./Clazz";
import request from "./request";

export const postCert = () => {
  let api = "/auth/cert";

  let param = new Cert();
  let e = getCache(api);
  if (e) {
    param.value = e.data.data;
  }

  request.request({
    url: api, //请求的接口路径
    method: "post", //请求方法
    data: param,
  });
};

export const postLogin = (param: any) => {
  return axios.postForm(request.getUri() + "/auth/login", param);
};

export const postLogout = () => {
  return request.request({
    url: "/auth/logout", //请求的接口路径
    method: "post", //请求方法
    //data: null,
  });
};

export const testAPIs = () => {
  return request.request({
    url: "/token", //请求的接口路径
    method: "post", //请求方法
    data: null,
  });
};
