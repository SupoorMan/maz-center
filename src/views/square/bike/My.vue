<template>
    <div class="my-box">
        <el-container>
            <el-header class="my-header">
                <div class="my-setting">
                    <el-button :icon="Bell" circle style="background-color: #00000000;color: #FFFFFF;" />
                    <el-button :icon="Setting" circle style="background-color: #00000000;color: #FFFFFF;" />
                </div>
                <div>
                    <el-row>
                        <el-col :span="5">
                            <el-avatar :size="50" :src="avatar" />
                        </el-col>
                        <el-col :span="13">
                            <div class="my-name-box">V8: 移动之星X</div>
                            <div class="my-info-box">VIP 2</div>
                        </el-col>
                        <el-col :span="6" class="my-info-edit">
                            <el-button :icon="EditPen" text
                                style="background-color: #00000000;color: #FFFFFF;width: 3rem;">
                                编辑
                            </el-button>
                        </el-col>
                    </el-row>

                    <!-- <el-divider /> -->

                    <el-row class="my-info2">
                        <el-col :span="18">
                            <div>⛅ 🌡️38° 🌀东南风 2级</div>
                        </el-col>
                        <el-col :span="6" style="text-align: end;">
                            <div>积分:122</div>
                        </el-col>
                    </el-row>
                </div>
            </el-header>

            <el-main class="my-main">
                待定
            </el-main>
        </el-container>
    </div>
</template>


<script setup lang="ts">
import {
    Menu as IconMenu,
    Setting, Bell, EditPen
} from '@element-plus/icons-vue'
import { ref } from 'vue';

const avatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
</script>

<style lang="scss" scoped>
.my-box {
    background-color: #FFFFFF;

    .my-header {
        padding-top: 2.8rem;
        height: 12.5rem;
        background: url('@/assets/my-bk.jpg');
        background-size: 100% 100%;
        // color: #fde800;
        color: #ffffff;
        text-shadow: 1px 1px 4px rgb(0, 0, 0);

        .my-setting {
            width: fit-content;
            margin-left: auto;
            margin-bottom: 0.5rem;
            border-radius: 14px;
        }

        .my-name-box {
            line-height: 1.7rem;
        }

        .my-info-box {
            line-height: 1.6rem;
            font-size: 1rem;
        }

        .my-info-edit {
            line-height: 3.3rem;
            text-align: end;
        }

        .my-info2 {
            margin-top: 1.2rem;
            line-height: 1.7rem;
        }
    }

    .my-main {
        background-color: bisque;
        // margin-top: 30px;
    }
}
</style>