<template>
 >>
    <svg class="svg-icon mz-icon-connecting_line" aria-hidden="true">
        <use :xlink:href="iconClassName"></use>
    </svg>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'

const props = defineProps({
    // 添加自定义类名
    className: {
        type: String,
        default: 'mz-icon-connecting_line'
    },
    // iconfont中的名字
    iconName: {
        type: String,
        required: true
    }
})

const svgClass = computed(() => {
    if (props.className) {
        return `svg-icon ${ props.className }`
    } else {
        return 'svg-icon'
    }
})
// const iconClassName = computed(() => `#${ props.iconName }`)
const iconClassName = ref('mz-icon-connecting_line')
</script>

<style lang="scss" scoped>
.svg-icon {
    width: 2em;
    height: 2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
