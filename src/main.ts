import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import SvgIcon from './components/icons/SvgIcon.vue'; // svg component

// 引入 SVG 注册脚本
import 'virtual:svg-icons-register'

const store = createPinia();
store.use(piniaPluginPersistedstate);
export default store;

const app = createApp(App);
app.component("svg-icon", SvgIcon);
app.use(store);

app.use(router);
app.use(ElementPlus);

app.mount("#app");
