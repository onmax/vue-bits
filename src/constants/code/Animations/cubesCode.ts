import code from '@content/Animations/Cubes/Cubes.vue?raw';
import type { CodeObject } from '../../../types/code';

export const cubes: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/Cubes`,
  installation: `npm install gsap`,
  usage: `// CREDIT
// Component inspired from Can Tastemel's original work for the lambda.ai landing page
// https://cantastemel.com

<template>
  <Cubes 
    :grid-size="10"
    :max-angle="45"
    :radius="3"
    easing="power3.out"
    :duration="{ enter: 0.3, leave: 0.6 }"
    border-style="1px solid #fff"
    face-color="#060010"
    :shadow="false"
    :auto-animate="true"
    :ripple-on-click="true"
    ripple-color="#fff"
    :ripple-speed="2"
  />
</template>

<script setup lang="ts">
  import Cubes from "./Cubes.vue";
</script>`,
  code
};
