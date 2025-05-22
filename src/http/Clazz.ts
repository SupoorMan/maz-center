/**
 * 本地缓存
 */
export class RequestActive {
  point: string = "";
  times: number = 0;
  timestamp: number = new Date().getTime();
  data: Types.response = {
    code: 200,
    message: "success",
    data: null,
  };
}

export class Cert {
  value: String = "";
  platform: string = "M";
  version: string = "M-1.0.1";
}

export class Menu {
  id?: number;
  name?: string;
  title?: string;
  permCode?: string;
  scope?: string;
  parentId?: number;
  sortIndex?: number;
  depth?: number;
}
