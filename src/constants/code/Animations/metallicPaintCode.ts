import code from '@/content/Animations/MetallicPaint/MetallicPaint.vue?raw'
import type { CodeObject } from '@/types/code'

export const metallicpaint: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/MetallicPaint`,
  usage: `<template>
  <MetallicPaint
    color="#c0c0c0"
    :intensity="0.8"
    :speed="2"
    :auto-play="true"
    trigger="auto"
    class-name="my-metallic-card"
  >
    <div class="content">
      <h3>Your Content Here</h3>
      <p>This will have a metallic paint effect</p>
    </div>
  </MetallicPaint>
</template>

<script setup lang="ts">
  import MetallicPaint from "./MetallicPaint.vue";
</script>`,
  code
}