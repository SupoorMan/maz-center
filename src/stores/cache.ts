import type { RequestActive } from "@/http/Clazz";
import { defineStore, mapActions } from "pinia";
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

