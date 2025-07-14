import code from '@/content/Animations/MetaBalls/MetaBalls.vue?raw';
import type { CodeObject } from '../../../types/code';

export const metaBalls: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/MetaBalls`,
  installation: `npm i ogl`,
  usage: `<template>
    <MetaBalls
        color="color"
        cursorBallColor="cursorBallColor"
        :cursorBallSize="cursorBallSize"
        :ballCount="ballCount"
        :animationSize="animationSize"
        :enableMouseInteraction="enableMouseInteraction"
        :enableTransparency="true"
        :hoverSmoothness="hoverSmoothness"
        :clumpFactor="clumpFactor"
        :speed="speed"
    />
</template>

<script setup lang="ts">
  import MetaBalls from "./MetaBalls.vue";
</script>`,
  code
};
