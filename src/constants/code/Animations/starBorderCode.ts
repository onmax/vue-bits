import code from '@content/Animations/StarBorder/StarBorder.vue?raw';
import type { CodeObject } from '../../../types/code';

export const starBorder: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/StarBorder`,
  usage: `<template>
    <StarBorder 
        as="button" 
        :color="color" 
        :speed="speedProp" 
        :thickness="thickness"
    >
        Star Border
    </StarBorder>
</template>

<script setup lang="ts">
  import StarBorder from './StarBorder.vue'
</script>`,
  code
};
