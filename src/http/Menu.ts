import type { Menu } from "./Clazz";
import request from "./request";

export const postMenuDelete = (param: Menu) => {
  return request.request({
    url: "/menu/delete", //请求的接口路径
    method: "post", //请求方法
    data: param,
  });
};
