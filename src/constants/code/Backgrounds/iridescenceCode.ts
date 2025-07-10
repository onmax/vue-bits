import code from '@content/Backgrounds/Iridescence/Iridescence.vue?raw'
import type { CodeObject } from '../../../types/code'

export const iridescence: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Backgrounds/Iridescence`,
  installation: `npm install ogl`,
  usage: `<template>
  <div class="w-full h-[400px]">
    <Iridescence 
      :color="[1, 1, 1]"
      :speed="1.0"
      :amplitude="0.1"
      :mouseReact="true"
    />
  </div>
</template>

<script setup lang="ts">
  import Iridescence from "./Iridescence.vue";
</script>`,
  code
}