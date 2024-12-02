import { defineStore } from "pinia";
import { ref } from "vue";

export const menuStore = defineStore(
  "MENU",
  () => {
    const crt_menu_1 = ref(-1)
    const crt_menu_2 = ref(-1)
    const editing = ref(false)

    return {
      crt_menu_1,
      crt_menu_2,
      editing
    };
  },
  {
    persist: true,
  }
);

