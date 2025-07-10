import code from '@content/TextAnimations/TextPressure/TextPressure.vue?raw'
import type { CodeObject } from '../../../types/code'

export const textPressure: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/TextAnimations/TextPressure`,
  usage: `<template>
  <TextPressure
    text="Hello!"
    :flex="true"
    :alpha="false"
    :stroke="false"
    :width="true"
    :weight="true"
    :italic="true"
    text-color="#ffffff"
    stroke-color="#27FF64"
    :min-font-size="36"
  />
</template>

<script setup lang="ts">
  import TextPressure from "./TextPressure.vue";
</script>`,
  code
}
