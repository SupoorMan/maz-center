<template>
    <div class="image-box">
        <el-image style="width: 45px; height: 45px" :src="clickLogo ? icon2 : icon" fit="contain" class="eicon" />
    </div>
</template>

<script setup lang="ts">
import url from "@/assets/logo.png";
import icon from "@/assets/icon0.png";
import icon2 from "@/assets/icon1.png";

//接受父组件传过来的参数
const props = defineProps({
    collapse: {
        type: Boolean,
        default: true,
    },
    clickLogo: {
        type: Boolean,
        default: false,
    },
});
</script>

<style lang="scss" scoped>
.image-box {
    text-align: center;
    user-select: none;
    pointer-events: none;

    .eicon {
        margin-top: 8px;
    }

    .eimage {
        mix-blend-mode: multiply;
        margin-left: 12px;
    }
}
</style>