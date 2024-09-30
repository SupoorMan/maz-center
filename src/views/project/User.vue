<template>
    <el-row class="user-box">
        <el-col :span="20">
            <RouteDetail></RouteDetail>
        </el-col>
        <el-col :span="4">
            ALL
        </el-col>
    </el-row>
</template>


<script setup lang="ts">
import RouteDetail from '@/components/base/RouteDetail.vue';
</script>

<style lang="scss" scoped>
.user-box {
    background-color: #FFFFFF;
    padding: $context-padding;
}
</style>