import code from '@/content/TextAnimations/AsciiText/AsciiText.vue?raw';
import type { CodeObject } from '../../../types/code';

export const asciiText: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/TextAnimations/AsciiText`,
  installation: `npm install three @types/three`,
  usage: `<template>
  <AsciiText
    text="Hey!"
    :ascii-font-size="8"
    :text-font-size="200"
    text-color="#fdf9f3"
    :plane-base-height="8"
    :enable-waves="true"
    class-name="w-full h-full"
  />
</template>

<script setup lang="ts">
  import AsciiText from "./AsciiText.vue";
</script>`,
  code
};
