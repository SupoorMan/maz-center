<template>
    <div class="layout-box">
        <el-container>
            <el-header class="header-box">
                <div class="header-top">
                    <img src="@/assets/Logomz.png" alt="logo" class="header-top-img">
                    <span>搭子·运动版</span>
                </div>

            </el-header>
            <el-main>
                个人项目
            </el-main>
        </el-container>
    </div>
</template>


<script setup lang="ts">
import RouteDetail from '@/components/base/RouteDetail.vue';


</script>

<style lang="scss" scoped>
.layout-box {
    background-color: #ffffff;

    .header-box {
        color: #04a5a3;

        .header-top {
            position: relative;
            text-align: -webkit-center;
            height: inherit;
            margin-top: 8px;
            font-size: 18px;

            .header-top-img {
                height: 22px;
                width: auto;
                position: fixed;
                left: 1rem;
            }

        }
    }
}
</style>