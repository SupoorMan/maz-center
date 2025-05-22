<template>
    <div class="staff-box">
        <div class="watermark">
            <template v-for="row in rows" :key="row">
                <template v-for="col in cols" :key="col">
                    <span class="watermark-text" :style="{
                        top: `${row * 222 - 222}px`,
                        left: `${col * 350 - 350}px`,
                    }">
                        甘其果
                    </span>
                </template>
            </template>
        </div>
        内部人员
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const rows = ref(20)
const cols = ref(12)

// 可根据容器大小动态调整rows/cols
onMounted(() => {
    // 可选：根据页面高度宽度动态调整rows/cols
})
</script>

<style lang="scss" scoped>
.staff-box {
    width: 100%;
    height: 100%;
    background-color: #e6e6e6;
    position: relative;
    overflow: hidden;
}

.watermark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.watermark-text {
    position: absolute;
    color: rgba(0, 0, 0, 0.05);
    font-size: 18px;
    font-weight: bold;
    transform: rotate(-32deg);
    user-select: none;
    white-space: nowrap;
}
</style>