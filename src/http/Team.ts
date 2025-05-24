import request from "./request";
import type { Menu } from "./Clazz";

class Param {}

// --------------- 订单相关 ---------------
export const getTeamList = (param: object) => {
  const res = request.request({
    url: "/team/list",
    method: "get",
    params: param,
  });

  return res;
};

export const getOrderDetailPage = (param: object) => {
  return request.request({
    url: "/order/detail/page",
    method: "get",
    params: param,
  });
};

export const getOrderDetailPage2 = (param: object) => {
  return request.request({
    url: "/order/detail/page",
    method: "post",
    data: param,
  });
};
