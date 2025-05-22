import { defineStore } from "pinia";
import { ref } from "vue";

// This store is used to manage the menu state in the application.
export const menuStore = defineStore(
  "MENU",
  () => {
    const menu_1st = ref()
    const menu_2nd = ref()
    const menu_3rd = ref()
    const editing = ref(false)

    return {
      menu_1st,
      menu_2nd,
      menu_3rd,
      editing
    };
  },
  {
    persist: true,
  }
);

