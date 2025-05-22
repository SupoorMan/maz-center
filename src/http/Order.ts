import request from "./request";
import type { Menu } from "./Clazz";

class Param {}

// --------------- 菜单 ---------------
export const getOrderPage = (param: object) => {
  const res = request.request({
    url: "/order/page", //请求的接口路径
    method: "get", //请求方法
    params: param,
  });

  return res;
};

export const addMenu = (param: Menu) => {
  return request.request({
    url: "/perm", //请求的接口路径
    method: "post", //请求方法
    data: param,
  });
};
