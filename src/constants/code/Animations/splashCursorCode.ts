import code from '@content/Animations/SplashCursor/SplashCursor.vue?raw'
import type { CodeObject } from '../../../types/code'

export const splashCursor: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/SplashCursor`,
  usage: `<template>
  <SplashCursor
    trail-color="#ff6b6b"
    :trail-length="15"
    :dot-size="10"
    :animation-speed="0.2"
    :fade-speed="0.03"
    :scale-variation="0.7"
    :delay-between-dots="30"
    class="cursor-area"
  >
    <div class="content">
      <h3>Interactive Area</h3>
      <p>Move your mouse to see the cursor trail effect</p>
    </div>
  </SplashCursor>
</template>

<script setup lang="ts">
import SplashCursor from '@/content/Animations/SplashCursor/SplashCursor.vue'
</script>

<style scoped>
.cursor-area {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.content {
  text-align: center;
  color: white;
  pointer-events: none;
  user-select: none;
}

.content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.content p {
  font-size: 1rem;
  opacity: 0.9;
}
</style>`,
  code
}