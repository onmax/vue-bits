import code from '@/content/Animations/Crosshair/Crosshair.vue?raw';
import type { CodeObject } from '@/types/code';

export const crosshair: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/Crosshair`,
  installation: `npm i gsap`,
  usage: `<template>
  <div ref="containerRef" style="height: 300px; overflow: hidden;">
    <Crosshair :container-ref="containerElement" color="#ffffff" />
  </div>
</template>

<script setup lang="ts">
  import { useTemplateRef, computed } from 'vue';
  import Crosshair from "./Crosshair.vue";
  
  const containerRef = useTemplateRef<HTMLDivElement>('containerRef');
  const containerElement = computed(() => containerRef.value);
</script>`,
  code
};
