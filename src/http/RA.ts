import { ref } from "vue";

/**
 * 本地缓存
 */
class RequestActive {
  point: string = "";
  times: number = 1;
}

export const Active = ref<RequestActive[]>([
  {
    point: "/menu/list",
    times: 1,
  },
]);
