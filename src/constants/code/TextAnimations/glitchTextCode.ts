import code from '@/content/TextAnimations/GlitchText/GlitchText.vue?raw'
import type { CodeObject } from '@/types/code'

export const glitchText: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/TextAnimations/GlitchText`,
  usage: `<template>
  <GlitchText
    text="vue-bits"
    :speed="1"
    :enable-shadows="true"
    :enable-on-hover="false"
    class-name="your-custom-class"
  />
</template>

<script setup lang="ts">
  import GlitchText from "./GlitchText.vue";
</script>`,
  code
}
