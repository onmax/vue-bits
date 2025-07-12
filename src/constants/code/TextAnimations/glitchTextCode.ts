import code from '@/content/TextAnimations/GlitchText/GlitchText.vue?raw';
import type { CodeObject } from '../../../types/code';

export const glitchText: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/TextAnimations/GlitchText`,
  usage: `<template>
  <GlitchText
    children="Vue Bits"
    :speed="0.5"
    :enable-shadows="true"
    :enable-on-hover="false"
  />
</template>

<script setup lang="ts">
  import GlitchText from "./GlitchText.vue";
</script>`,
  code
};
