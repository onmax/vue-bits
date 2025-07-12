import code from '@content/Backgrounds/ShapeBlur/ShapeBlur.vue?raw';
import type { CodeObject } from '../../../types/code';

export const shapeBlur: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Backgrounds/ShapeBlur`,
  installation: `npm install three`,
  usage: `<template>
  <ShapeBlur
    :variation="0"
    :pixel-ratio-prop="2"
    :shape-size="1.2"
    :roundness="0.4"
    :border-size="0.05"
    :circle-size="0.3"
    :circle-edge="0.5"
    class="shape-blur-effect"
  />
</template>

<script setup lang="ts">
  import ShapeBlur from "./ShapeBlur.vue";
</script>`,
  code
};
