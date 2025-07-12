import code from '@/content/TextAnimations/TextCursor/TextCursor.vue?raw';
import type { CodeObject } from '@/types/code';

export const textCursor: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/TextAnimations/TextCursor`,
  installation: `npm install motion-v`,
  usage: `<template>
  <TextCursor
    text="⚛️"
    :delay="0.01"
    :spacing="100"
    :follow-mouse-direction="true"
    :random-float="true"
    :exit-duration="0.5"
    :removal-interval="30"
    :max-points="5"
  />
</template>

<script setup lang="ts">
  import TextCursor from "./TextCursor.vue";
</script>`,
  code
};
