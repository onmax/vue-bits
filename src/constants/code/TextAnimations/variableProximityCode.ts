import code from '@content/TextAnimations/VariableProximity/VariableProximity.vue?raw'
import type { CodeObject } from '../../../types/code'

export const variableProximity: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/TextAnimations/VariableProximity`,
  installation: `// No additional dependencies required`,
  usage: `<template>
  <VariableProximity
    text="Hover over this text to see the proximity effects!"
    :radius="100"
    :max-scale="1.5"
    :min-scale="1"
    :max-opacity="1"
    :min-opacity="0.3"
    :max-font-size="1.2"
    :min-font-size="1"
    :max-translate-y="-10"
    :min-translate-y="0"
    :color-intensity="0.8"
    :shadow-intensity="0.8"
    animation-type="all"
    :interactive="true"
    highlight-color="#27FF64"
    shadow-color="#27FF64"
    text-align="center"
    class="variable-proximity-demo"
    @proximity-change="handleProximityChange"
  />
</template>

<script setup lang="ts">
  import VariableProximity from "./VariableProximity.vue";

  const handleProximityChange = (data: { index: number; distance: number; intensity: number }) => {
    console.log('Proximity change:', data);
  };
</script>

<style scoped>
  .variable-proximity-demo {
    font-size: 3rem;
    font-weight: 600;
    color: var(--colors-neutral-100);
    cursor: pointer;
  }
</style>`,
  code
}