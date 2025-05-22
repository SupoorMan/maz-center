<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 16
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  class: {
    type: String,
    default: ''
  }
})

const symbolId = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  return [
    'svg-icon',
    props.class,
    typeof props.size === 'number' ? `w-${props.size} h-${props.size}` : props.size
  ].filter(Boolean).join(' ')
})
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>