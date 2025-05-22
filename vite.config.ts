import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";

import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[name]",
    }),
  ],
  // publicDir: "./",
  // server: {
  //   port: 5173,
  //   host: true,
  //   proxy: {//同时打开Network服务代理
  //     '/': { // 匹配请求路径，
  //       // target: 'http:/127.0.0.1:8033',// 代理的目标地址
  //       target: 'https://mall.shuzhuyun.com:7788/mall',// 代理的目标地址
  //       // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
  //       changeOrigin: true,
  //       secure: false,
  //       // secure: true, // 是否https接口
  //       ws: true, // 是否代理websockets

  //       // 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
  //       //简单来说，就是是否改路径 加某些东西
  //       //rewrite: (path) => path.replace('/text', '')
  //     }
  //   }
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/ango.scss";`, // 此处全局的scss文件
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
