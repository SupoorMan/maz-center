import request from "./request";

class Param {
  "key": "manage";
  "phone": String;
  "dataTime": String;
}

export const ptList = (param: any, header: string) => {
  return request.request({
    url: "/pt/list", //请求的接口路径
    method: "get", //请求方法
    headers: { token: header },
    params: param,
  });
};

export const updatePt = (param: Obj.ProductTemplate) => {
  return request.request({
    url: "/pt/update", //请求的接口路径
    method: "post", //请求方法
    data: param
  });
};

export const addPt = (param: Obj.ProductTemplate) => {
  return request.request({
    url: "/pt/add", //请求的接口路径
    method: "post", //请求方法
    data: param
  });
};
