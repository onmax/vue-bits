import code from '@content/Animations/PixelTrail/PixelTrail.vue?raw'
import type { CodeObject } from '../../../types/code'

export const pixelTrail: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/PixelTrail`,
  usage: `<template>
  <PixelTrail
    particle-color="#ff6b6b"
    :particle-size="6"
    :particle-count="75"
    :trail-length="30"
    :fade-speed="0.08"
    :spawn-rate="3"
    :random-offset="15"
    blend-mode="screen"
    class="interactive-area"
  >
    <div class="content">
      <h3>Interactive Area</h3>
      <p>Move your mouse to create a pixel trail</p>
    </div>
  </PixelTrail>
</template>

<script setup lang="ts">
import PixelTrail from '@/content/Animations/PixelTrail/PixelTrail.vue'
</script>

<style scoped>
.interactive-area {
  width: 100%;
  height: 300px;
  border: 2px solid #333;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  cursor: crosshair;
}

.content {
  text-align: center;
  pointer-events: none;
  user-select: none;
  color: #fff;
}

.content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.content p {
  font-size: 1rem;
  opacity: 0.7;
}
</style>`,
  code
}