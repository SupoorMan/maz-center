<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { cacheStore } from './stores/cache';
import { watch } from 'vue';

const cache = cacheStore();
watch(cache.active, (n, o) => {
  if (n.length > 10) {
    n.pop()
  }
})
</script>

<style lang="scss">
#app {
  height: 100%;
  font-family: "jakarta";
}

html,
body {
  height: 100%;
  overflow: hidden;
  font-size: 16px;
  background-color: #F9F8FF;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "jakarta";
  src: url(@/assets/font/PlusJakartaSans-Medium.ttf);
}
</style>
