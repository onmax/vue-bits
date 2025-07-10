import code from '@/content/Animations/MagnetLines/MagnetLines.vue?raw'
import type { CodeObject } from '@/types/code'

export const magnetLines: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/MagnetLines`,
  usage: `<template>
  <MagnetLines 
    :rows="10" 
    :columns="12" 
    container-size="40vmin" 
    line-color="#efefef"
    line-width="2px" 
    line-height="30px"
    :base-angle="-10"
  />
</template>

<script setup lang="ts">
  import MagnetLines from "./MagnetLines.vue";
</script>`,
  code
}
