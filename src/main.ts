import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import axios from "axios";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const store = createPinia();
store.use(piniaPluginPersistedstate);
export default store;

const app = createApp(App);
app.use(store);

app.config.globalProperties.$axios = axios;
app.use(router);
app.use(ElementPlus);

app.mount("#app");
