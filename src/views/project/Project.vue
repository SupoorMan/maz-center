<template>
    <el-row class="project-box">
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
.project-box {
    background-color: #FFFFFF;
    padding: $context-padding;
}
</style>