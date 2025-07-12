import code from '@content/Backgrounds/Squares/Squares.vue?raw';
import type { CodeObject } from '../../../types/code';

export const squares: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Backgrounds/Squares`,
  usage: `<template>
  <div class="w-full h-[400px]">
    <Squares 
      direction="diagonal"
      :speed="1"
      :squareSize="40"
      borderColor="#999"
      hoverFillColor="#222"
    />
  </div>
</template>

<script setup lang="ts">
  import Squares from "./Squares.vue";
</script>`,
  code
};
