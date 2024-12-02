import request from "./request";

const root = "/optionConfig";

export const get = (param: Types.optionConfig) => {
  return request.request({
    url: root + "/get",
    method: "get",
    params: param,
  });
};

export const list = (param: Types.optionConfig) => {
  return request.request({
    url: root + "/list",
    method: "get",
    params: param,
  });
};

export const add = (param: Types.optionConfig) => {
  return request.request({
    url: root + "/add",
    method: "post",
    data: param,
  });
};

export const del = (param: Types.optionConfig) => {
  return request.request({
    url: root + "/delete",
    method: "post",
    data: param,
  });
};
