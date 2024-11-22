<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { cacheStore } from './stores/cache';
import { watch } from 'vue';

const cache = cacheStore();
watch(cache.active, (n, o) => {
  // for(let i=1;i<n.length;i++){
  //   if(n[i-1].point==n[i].point){

  //   }
  // }

  // n.forEach(n => {
  //   console.log('---触发监听---N:' + JSON.stringify(n))
  // })
  // o.forEach(n => {
  //   console.log('---触发监听---O:' + JSON.stringify(n))
  // })
  console.log('Log')
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
