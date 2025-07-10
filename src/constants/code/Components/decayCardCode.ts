import code from '@content/Components/DecayCard/DecayCard.vue?raw'
import type { CodeObject } from '../../../types/code'

export const decayCard: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Components/DecayCard`,
  installation: `npm install gsap`,
  usage: `<template>
  <DecayCard
    :width="300"
    :height="400"
    image="https://picsum.photos/300/400?grayscale"
  >
    <div style="mix-blend-mode: overlay;">
      Decay<br />Card
    </div>
  </DecayCard>
</template>

<script setup lang="ts">
  import DecayCard from "./DecayCard.vue";
</script>`,
  code
}
