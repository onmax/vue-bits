import code from '@content/Backgrounds/RippleGrid/RippleGrid.vue?raw';
import type { CodeObject } from '../../../types/code';

export const rippleGrid: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Backgrounds/RippleGrid`,
  installation: `npm install ogl`,
  usage: `<template>
  <div class="relative overflow-hidden h-[600px]">
    <RippleGrid
      :enable-rainbow="false"
      :grid-color="#ffffff"
      :ripple-intensity="0.05"
      :grid-size="10"
      :grid-thickness="15"
      :mouse-interaction="true"
      :mouse-interaction-radius="1.2"
      :opacity="0.8"
    />
  </div>
</template>

<script setup lang="ts">
  import RippleGrid from "./RippleGrid.vue";
</script>`,
  code
};
