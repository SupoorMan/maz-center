import request from "./request";

class Param {}

// --------------- 菜单 ---------------
export const getMenuList = (param: object) => {
  return request.request({
    url: "/menu/list", //请求的接口路径
    method: "get", //请求方法
    params: param,
  });
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