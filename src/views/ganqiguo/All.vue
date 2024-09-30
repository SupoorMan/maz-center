<template>
    <div class="ganqiguo-all-box">
        <RouterView></RouterView>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';


</script>

<style lang="scss" scoped>
.ganqiguo-all-box {
    background-color: #ffffff;
    padding: $context-padding;
    text-align: center;

}
</style>