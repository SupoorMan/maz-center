import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import axios from "axios";

const store = createPinia();
const app = createApp(App);
app.use(store);

app.config.globalProperties.$axios = axios;
app.use(router);
app.use(ElementPlus);

app.mount("#app");
