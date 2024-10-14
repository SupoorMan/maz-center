<template>
  <button
    :class="computedClass"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
 
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
 
export default defineComponent({
  name: 'CustomButton',
 
  props: {
    variant: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary'].includes(value),
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value),
    },
  },
 
  computed: {
    computedClass(): string {
      return `btn-${this.variant} btn-${this.size}`;
    },
  },
 
  methods: {
    handleClick(event: Event): void {
      this.$emit('click', event);
    },
  },
});
</script>
 
<style scoped>
.btn-primary {
  background-color: blue;
  color: white;
}
 
.btn-secondary {
  background-color: grey;
  color: black;
}
 
.btn-small {
  padding: 5px 10px;
  font-size: 12px;
}
 
.btn-medium {
  padding: 10px 20px;
  font-size: 16px;
}
 
.btn-large {
  padding: 15px 30px;
  font-size: 20px;
}
</style>