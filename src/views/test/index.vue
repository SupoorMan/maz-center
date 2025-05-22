<template>
  <div class="container">
    <div class="toolbar">Toolbar</div>
    <div class="canvas-container">
      <canvas></canvas>
    </div>

    <div>
      <el-card style="width: 400px;height: 300px;">
        <div slot="header">Card</div>
        <div>Card Content</div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.toolbar {
  padding: 10px;
  background-color: #e0e0e0;
}

.canvas-container {
  flex: 1;
  position: relative;
  overflow: auto;
}

canvas {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}
</style>    