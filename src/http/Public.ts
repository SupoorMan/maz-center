import { securityStore } from "@/stores/security";
import request from "./request";
import type { Menu } from "./Clazz";

class Param {}

// --------------- 菜单 ---------------
export const getMenuList = (param: object) => {
  const res = request.request({
    url: "/menu/list", //请求的接口路径
    method: "get", //请求方法
    params: param,
  });

  return res;
};

export const menuList = (param: any) => {
  return request.request({
    url: "/menu/list", //请求的接口路径
    method: "get", //请求方法
    params: param,
  });
};

export const getMenuSubList = (param: any) => {
  return request.request({
    url: "/menu/subList", //请求的接口路径
    method: "get", //请求方法
    params: param,
  });
};

export const addMenu = (param: Menu) => {
  return request.request({
    url: "/menu/add", //请求的接口路径
    method: "post", //请求方法
    data: param,
  });
};
