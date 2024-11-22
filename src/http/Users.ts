import { getCache } from "@/stores/cache";
import { securityStore } from "@/stores/security";
import axios from "axios";
import { Cert } from "./Clazz";
import request from "./request";

export const postCert = () => {
  let api = "/security/cert";

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

const check = (api: string) => {};

export const postLogin = (param: any) => {
  let e = getCache("/security/cert");
  if (e) {
    param.cert = e.data.data;
  } else {
    return null;
  }

  // const security = securityStore();
  return axios.post(request.getUri() + "/security/login", param)
  // .then((res) => {
  //   if (res.data.code == 200) {
  //     security.token = res.headers.token;
  //     security.logged = true;
  //   }
  // });
  // return security.logged;
};

export const testAPIs = () => {
  return request.request({
    url: "/token", //请求的接口路径
    method: "post", //请求方法
    data: null,
  });
};
