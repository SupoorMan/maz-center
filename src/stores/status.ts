import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const store = defineStore("synchronizer", (()=> {
  
  const token = ref('');
  const crt_first_menu = ref(0)

  return {
    token,
    crt_first_menu
  };
}))
