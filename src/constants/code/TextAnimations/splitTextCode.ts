// Fun fact: this is the first component ever made for Vue Bits!
import code from '@content/TextAnimations/SplitText/SplitText.vue?raw'
import type { CodeObject } from '../../../types/code'

export const splitText: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/TextAnimations/SplitText`,
  installation: `npm install gsap`,
  usage: `<template>
  <SplitText
    text="Hello, GSAP!"
    class-name="text-2xl font-semibold text-center"
    :delay="100"
    :duration="0.6"
    ease="power3.out"
    split-type="chars"
    :from="{ opacity: 0, y: 40 }"
    :to="{ opacity: 1, y: 0 }"
    :threshold="0.1"
    root-margin="-100px"
    text-align="center"
    @animation-complete="handleAnimationComplete"
  />
</template>

<script setup lang="ts">
  import SplitText from "./SplitText.vue";

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
</script>`,
  code
}