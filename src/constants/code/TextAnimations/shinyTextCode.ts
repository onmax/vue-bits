import code from '@content/TextAnimations/ShinyText/ShinyText.vue?raw';
import type { CodeObject } from '../../../types/code';

export const shinyText: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/TextAnimations/ShinyText`,
  usage: `<template>
  <ShinyText 
    text="Just some shiny text!" 
    :disabled="false" 
    :speed="3" 
    class-name="your-custom-class"
  />
</template>

<script setup lang="ts">
  import ShinyText from "./ShinyText.vue";
</script>`,
  code
};
