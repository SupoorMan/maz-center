import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Project from "../views/project/Project.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "认证",
      component: Login,
    },
    {
      path: "/",
      name: "主页",
      component: Home,
      children: [
        {
          path: "/project",
          name: "项目管理",
          redirect: "/project/all",
          children: [
            {
              path: "/project/all",
              name: "🔅 项目汇总",
              component: Project,
            },
            {
              path: "/project/list",
              name: "🧱 项目列表",
              component: () => import("../views/project/List.vue"),
            },
            {
              path: "/project/user",
              name: "🚻 项目人员",
              component: () => import("../views/project/User.vue"),
            },
          ],
        },
        {
          path: "/tool",
          name: "开发工具",
          component: () => import("../views/tool/Tool.vue"),
          children: [
            {
              path: "/tool/code",
              name: "👻 快速代码",
              redirect: "/tool/code/javaauto",
              children: [
                {
                  path: "/tool/code/javaauto",
                  name: "🦴 Java curd",
                  meta: {
                    scope: "javaauto",
                  },
                  component: () => import("../views/tool/ToolCodeJavaCURD.vue"),
                },
                {
                  path: "/tool/code/vue3curd",
                  name: "👽 Vue3 curd(TS)",
                  component: () => import("../views/tool/ToolCodeVue3CURD.vue"),
                },
              ],
            },
            {
              path: "/tool/deploy",
              name: "🦴 部署",
              component: () => import("../views/security/User.vue"),
            },
          ],
        },
        {
          path: "/knowledge",
          name: "知识",
          redirect: "/knowledge/java",
          children: [
            {
              path: "/knowledge/java",
              name: "👻 Java",
              component: () => import("../views/knowledge/Java.vue"),
            },
            {
              path: "/knowledge/cpp",
              name: "🦴 C++",
              component: () => import("../views/knowledge/C++.vue"),
            },
          ],
        },
        {
          path: "/backyard",
          name: "😶‍🌫️ 我的",
          //component: () => import("../views/backyard/All.vue"),
          children: [
            {
              path: "/my/music",
              name: "🎵 音乐",
              component: () => import("../views/backyard/Music.vue"),
            },
          ],
        },
        {
          path: "/security",
          name: "授权管理",
          redirect: "/security/all",
          children: [
            {
              path: "/security/authorization",
              name: "🧱 授权",
              component: Project,
            },
            {
              path: "/security/user",
              name: "⚧️ 用户",
              component: () => import("../views/security/User.vue"),
            },
            {
              path: "/security/role",
              name: "🕵️ 角色",
              component: () => import("../views/project/User.vue"),
            },
            {
              path: "/security/authority",
              name: "🎫 权限",
              component: () => import("../views/project/User.vue"),
            },
          ],
        },
        {
          path: "/ganqiguo",
          name: "🏵️ 甘其果",
          component: () => import("../views/ganqiguo/All.vue"),
          children: [
            {
              path: "/ganqiguo/pt",
              name: "🍊 商品(ToB)",
              component: () => import("../views/ganqiguo/ProductTemplate.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/ganqiguo/bonus",
      name: "🍉 分红信息",
      component: () => import("../views/ganqiguo/Bonus.vue"),
    },
    {
      path: "/ganqiguo/gift",
      name: "🎁 专属礼品",
      component: () => import("../views/ganqiguo/Gift.vue"),
    },
    {
      path: "/ganqiguo/giftDetail",
      name: "🎁 专属礼品详情",
      component: () => import("../views/ganqiguo/GiftDetail.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },{
      path: "/square",
      name: "🚲 骑行",
      component: () => import("../views/square/bike/Home.vue"),
      children: [
        {
          path: "/square/friend",
          name: "搭子",
          component: () => import("../views/square/bike/Friend.vue"),
        },{
          path: "/square/hall",
          name: "大厅",
          component: () => import("../views/square/bike/Hall.vue"),
        },{
          path: "/square/sport",
          name: "出发",
          component: () => import("../views/square/bike/Sport.vue"),
        },{
          path: "/square/music",
          name: "音乐",
          component: () => import("../views/square/bike/Music.vue"),
        },{
          path: "/square/my",
          name: "我的",
          component: () => import("../views/square/bike/My.vue"),
        },
      ],
    },
  ],
});

export default router;
