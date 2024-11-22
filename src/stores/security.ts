import { defineStore } from "pinia";
import { ref } from "vue";

export const securityStore = defineStore(
  "SECURITY",
  () => {
    const token = ref();
    const logged = ref(false);

    return {
      token,
      logged,
    };
  },
  {
    persist: true,
  }
);
