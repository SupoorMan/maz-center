import type { RequestActive } from "@/http/Clazz";
import { defineStore } from "pinia";
import { ref } from "vue";

export const cacheStore = defineStore(
  "NATIVE_CACHE",
  () => {
    const active = ref<RequestActive[]>([]);

    return {
      active,
    };
  },
  {
    persist: true,
  }
);

export const getCache = (point: string) => {
  const cache = cacheStore();
  for (let i = cache.active.length - 1; i >= 0; i--) {
    if (cache.active[i].point == point) {
      console.log("返回cache:" + JSON.stringify(cache.active[i]));
      
      return cache.active[i];
    }
  }
  return null;
};
