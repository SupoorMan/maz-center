import { cacheStore } from "@/stores/cache";
import request from "./request";

export const postCert = () => {
  let api = "/security/cert";

  let isTimeout = false;
  const cache = cacheStore();
  if (cache.active.length > 0) {
    let thisTime = new Date().getTime();

    for (let i = cache.active.length - 1; i <= 0; i--) {
      let sub = thisTime - cache.active[i].data.timeout;
      console.log(sub)
      if (sub > 10 * 60 * 1000) {
        isTimeout = true;
        break
      }
      if (cache.active[i].point == api) {
        isTimeout = false;
        break
      }
    }
  }

  if (isTimeout) {
    request.request({
      url: api, //请求的接口路径
      method: "post", //请求方法
      data: {
        code: null,
        platform: "M",
        version: "M-1.0.1",
      },
    });
  }
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
