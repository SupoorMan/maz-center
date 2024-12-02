import { defineStore } from "pinia";
import { ref } from "vue";

export const securityStore = defineStore(
  "SECURITY",
  () => {
    const token = ref();
    const logged = ref(false);

    const clear = () => {
      token.value = "";
      logged.value = false;
    };
    return {
      token,
      logged,
      clear
    };
  },
  {
    persist: true,
  }
);
