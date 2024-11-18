/**
 * 本地缓存
 */
export class RequestActive {
  point: string = "";
  times: number = 0;
  timestamp: number = new Date().getTime();
  data: Types.response = {
    code: 200,
    message: "",
    data: {},
    cache: false,
    timeout: -1,
  };
}
