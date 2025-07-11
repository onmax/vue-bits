import code from '@content/TextAnimations/ScrollFloat/ScrollFloat.vue?raw'
import type { CodeObject } from '../../../types/code'

export const scrollFloatCode: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Components/ProfileCard`,
  usage: `<template>
  <ScrollFloat
    :children="scrollText"
    :animation-duration="animationDuration"
    :ease="ease"
    :scroll-start="scrollStart"
    :scroll-end="scrollEnd"
    :stagger="stagger"
    :container-class-name="containerClassName"
    :text-class-name="textClassName"
    :scroll-container-ref="{ current: containerRef }"
    :key="rerenderKey"
  />
</template>

<script setup lang="ts">
  import ScrollFloat from "./ScrollFloat.vue";
</script>`,
  code
}