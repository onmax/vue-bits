import code from '@content/Backgrounds/Orb/Orb.vue?raw';
import type { CodeObject } from '../../../types/code';

export const orb: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Backgrounds/Orb`,
  installation: `npm i ogl`,
  usage: `<template>
  <div class="relative w-full h-[600px]">
    <Orb :hoverIntensity="0.5" :rotateOnHover="true" :hue="0" :forceHoverState="false" />
  </div>
</template>

<script setup lang="ts">
  import Orb from "./Orb.vue";
</script>`,
  code
};
