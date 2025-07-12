import code from '@content/TextAnimations/ScrollReveal/ScrollReveal.vue?raw';
import type { CodeObject } from '../../../types/code';

export const scrollRevealCode: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/TextAnimations/ScrollReveal`,
  usage: `<template>
    <ScrollReveal
      :children="scrollText"
      :enable-blur="enableBlur"
      :base-opacity="baseOpacity"
      :base-rotation="baseRotation"
      :blur-strength="blurStrength"
      :container-class-name="containerClassName"
      :text-class-name="textClassName"
      :rotation-end="rotationEnd"
      :word-animation-end="wordAnimationEnd"
      :scroll-container-ref="{ current: containerRef }"
      :key="rerenderKey"
    />
</template>

<script setup lang="ts">
  import ScrollReveal from "./ScrollReveal.vue";
</script>`,
  code
};
