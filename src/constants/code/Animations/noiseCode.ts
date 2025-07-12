import code from '@/content/Animations/Noise/Noise.vue?raw'
import type { CodeObject } from '@/types/code'

export const noise: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/Noise`,
  usage: `<template>
  <Noise
    :speed="1"
    :scale="1"
    color="#ffffff"
    :intensity="1"
    :frequency="0.5"
    class-name="w-full h-full"
  />
</template>

<script setup lang="ts">
  import Noise from "./Noise.vue";
</script>`,
  code
}