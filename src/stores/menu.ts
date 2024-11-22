import { defineStore } from "pinia";
import { ref } from "vue";

export const menuStore = defineStore(
  "MENU",
  () => {
    const crt_menu_1 = ref(0)
    const crt_menu_2 = ref(0)

    return {
      crt_menu_1,
      crt_menu_2
    };
  },
  {
    persist: true,
  }
);

