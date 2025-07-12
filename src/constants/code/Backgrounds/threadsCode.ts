import code from '@content/Backgrounds/Threads/Threads.vue?raw';
import type { CodeObject } from '../../../types/code';

export const threads: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Backgrounds/Threads`,
  installation: `npm install ogl`,
  usage: `<template>
  <div class="w-full h-[400px]">
    <Threads 
      :color="[1, 1, 1]"
      :amplitude="1"
      :distance="0"
      :enableMouseInteraction="false"
    />
  </div>
</template>

<script setup lang="ts">
  import Threads from "./Threads.vue";
</script>`,
  code
};
