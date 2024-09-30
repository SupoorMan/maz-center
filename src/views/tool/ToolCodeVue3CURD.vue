<template>
    <el-row class="user-box">
        <el-col :span="24">
            <RouteDetail></RouteDetail>
        </el-col>
        <el-col :span="24">
            <el-card style="max-width: 480px">
                <template #header>
                    <div class="card-header">
                        <span>Card name</span>
                    </div>
                </template>
                <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
                <template #footer>Footer content</template>
            </el-card>
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