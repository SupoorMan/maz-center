declare namespace Types {
  //api响应类型
  type response = {
    code?: number;
    message?: string;
    data?: any;
  };

  //全局方案配置
  type optionConfig = {
    id?: any;
    label?: string;
    remark?: string;
    userid?: number;
    scope?: string;
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
  type AllMenu = {
    project: Array<Menu>;
    menu0: Array<Menu>;
    menu1: Array<Menu>;
  };

  type Menu = {
    id: number;
    name: string;
    title: string;
    permCode: string;
    scopeType: string;
    sortIndex: number;
    disabled: number;
    hide: number;
    router: string;
    icon: string;
    path?: string;
    style: string;
  };
  type Menu2 = {
    id: number;
    pid: number;
    level: number;
    label: string;
    path?: string;
    usable: number;
    deletable: number;
    style: any;
  };
  type MenuALL = {
    0: Menu[];
    1: Menu[];
    2: Menu[];
  };

  type Orders = {
    id: number;
    name: string;
    backNum: number;
    endTime: Date;
    finalCost: number;
    income: number;
    lossNum: number;
    owner: string;
    remark: null;
    startTime: Date;
    status: number;
    totalNum: number;
    type: number;
    updateId: number;
    createTime: Date;
    updateTime: Date;
    children: OrdersDetail[];
  };

  type OrdersDetail = {
    id: number;
    ordersId: number;
    orderNumber: string;
    team: string;
    details: string;
    receiveTime: Date;
    pickupAddress: string;
    deliveryAddress: string;
    customerName: string;
    customerContact: string;
    deliveryTimeLimit: number;
    deliveryPhoto: string;
    courier: string;
    courierPhone: string;
    owner: string;
    remark: string;
    rewardPoints: number;
    createTime: Date;
    updateTime: Date;
    selfRemark: string;
    status: number; // 订单状态: 0.新订单 1.已备货 2.缺货 3.配送中 4.已送达 5.已评价 6.已到账 7.已退款 8.完成 9.漏货完成 10.坏果完成
  };

  type Team = {
    id: number;
    name: string;
    tags: string;
    owner: string; // 团长
    ownerPhone: string; // 团长电话
    num: number; //人数
    disabled: number; //0.已启用 1.已禁用
  };
}
