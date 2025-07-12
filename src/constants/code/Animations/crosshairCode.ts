import code from '@/content/Animations/Crosshair/Crosshair.vue?raw'
import type { CodeObject } from '@/types/code'

export const crosshair: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/Crosshair`,
  usage: `<template>
  <div class="app">
    <Crosshair
      variant="default"
      :size="40"
      color="#6366f1"
      :opacity="0.8"
      :smoothness="0.15"
      :hover-scale="1.5"
      :hover-targets="['a', 'button', '[role=\\"button\\"]']"
      :hide-on-leave="true"
      blend-mode="difference"
    />
    
    <div class="content">
      <h1>Your content here</h1>
      <button>Interactive element</button>
      <a href="#">Link</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import Crosshair from "./Crosshair.vue"
</script>

<style>
.app {
  cursor: none;
}
</style>`,
  code
}