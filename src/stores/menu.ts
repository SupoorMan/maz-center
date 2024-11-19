import { defineStore } from "pinia";
import { ref } from "vue";

export const menuStore = defineStore(
  "MENU",
  () => {
    const crt_first_menu = ref(0)
    const crt_second_menu = ref(0)

    return {
      crt_first_menu,
      crt_second_menu
    };
  },
  {
    persist: true,
  }
);

