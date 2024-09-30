<template>
    <el-row class="route-detail-box">
        <el-col :span="24">
            <el-button plain link class="route-top-box">
                <el-icon class="mz-icons mz-icon-huanjierenwu route-icon-1"></el-icon>
                <b>{{ topNode }}</b>
            </el-button>
            <div class="route-sub-box">
                <el-icon class="mz-icons mz-icon-connecting_line route-icon-2"></el-icon>
                <el-button plain link>
                    {{ currentNode }}
                </el-button>

                <span v-if="lastNode" class="node3">
                    <el-icon class="mz-icons mz-icon-map-connect route-icon-3"></el-icon>
                    <el-button plain link>
                        {{ lastNode }}
                    </el-button>
                </span>
            </div>
        </el-col>
    </el-row>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
    Right
} from '@element-plus/icons-vue'

const route = useRoute();
const crrent = route.fullPath;
const matched = route.matched;

// 顶级节点
const topNode = ref()
if (matched.length == 2) {
    topNode.value = matched[1].name
}

if (matched.length == 3) {
    topNode.value = matched[1].name
}

//最后节点
const lastNode = ref()
// 当前节点
const currentNode = ref()
currentNode.value = matched[matched.length - 1].name

if (matched.length == 4) {
    topNode.value = matched[1].name

    currentNode.value = matched[matched.length - 2].name
    lastNode.value = matched[matched.length - 1].name
}
</script>

<style lang="scss" scoped>
@import '@/assets/mzicon/iconfont.css';

.route-detail-box {
    background-color: #ffffff;

    .route-top-box {
        pointer-events: none;

        .route-icon-1 {
            color: #00B884;
            margin-right: 4px;
        }
    }

    .route-sub-box {
        margin-left: 10px;

        .route-icon-2 {
            line-height: 1em;
        }

        .node3 {
            margin-left: 4px;

            .route-icon-3 {
                line-height: 1em;
                margin-right: 2px;
            }
        }
    }

}
</style>