import code from '@content/Animations/Noise/Noise.vue?raw';
import type { CodeObject } from '../../../types/code';

export const noise: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/Noise`,
  usage: `<template>
  <Noise 
    :pattern-size="250" 
    :pattern-scale-x="1" 
    :pattern-scale-y="1"
    :pattern-alpha="10"
  />
</template>

<script setup lang="ts">
  import Noise from './Noise.vue'
</script>`,
  code
};
