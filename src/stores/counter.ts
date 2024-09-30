import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const menuStore = defineStore("menuStore", {
  state: () => {
    return {
      crt_first_menu: 0,
    };
  },
  getters: {},
  actions: {},
});
