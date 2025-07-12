import code from '@/content/Animations/AnimatedContent/AnimatedContent.vue?raw';
import type { CodeObject } from '@/types/code';

export const animatedContent: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/AnimatedContent`,
  installation: `npm install gsap`,
  usage: `<template>
  <AnimatedContent
    :distance="100"
    direction="vertical"
    :reverse="false"
    :duration="0.8"
    ease="power3.out"
    :initial-opacity="0"
    :animate-opacity="true"
    :scale="1"
    :threshold="0.1"
    :delay="0"
    @complete="handleComplete"
  >
    <div class="your-content">
      Content to animate
    </div>
  </AnimatedContent>
</template>

<script setup lang="ts">
  import AnimatedContent from "./AnimatedContent.vue";
  
  const handleComplete = () => {
    console.log("Animation completed!");
  };
</script>`,
  code
};
