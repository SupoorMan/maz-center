declare namespace M {
  //api响应类型
  type response = {
    code?: number;
    message?: String;
    data?: any;
  };

  //全局方案配置
  type optionConfig = {
    id?: any;
    label?: String;
    remark?: String;
    userid?: number;
    scope?: String;
  };

  //方案 - 数据库配置
  type optionDB = {
    ip?: "127.0.0.1";
    port?: 3306;
    username?: "root";
    password?: "";
    dbType?: "mysql";
    dbname?: "";
    optionId?: 1;
  };

  type ProductTemplate = {
    id?: number;
    classifyId?: number;
    classifyName?: number;
    productName?: string;
    recommendPrice?: string;
    sourcePrice?: string;
    selfSourcePrice?: string;
    spaceUnit?: string;
    cover?: string;
  };

  type Classify = {
    id?: number;
    classifyName?: string;
  };

  type Music = {
    id?: number;
    label?: string;
    musicPath?: string;
  };

  // 菜单
  type Menu = {
    id: number;
    topId: number;
    label: string;
    path?: string;
  };
  type Menu2 = {
    id: number;
    topId: number;
    label: string;
    path?: string;
    style?: string;
  };
  type MenuALL = {
    0: Menu[];
    1: Menu[];
    2: Menu[];
  };

}

