import code from '@content/Components/Carousel/Carousel.vue?raw';
import type { CodeObject } from '../../../types/code';

export const carousel: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Components/Carousel`,
  installation: `npm install motion-v`,
  usage: `<template>
  <Carousel 
    :items="carouselItems"
    :base-width="300"
    :autoplay="true"
    :autoplay-delay="3000"
    :pause-on-hover="true"
    :loop="true"
    :round="false"
  />
</template>

<script setup lang="ts">
  import Carousel from "./Carousel.vue";
  import type { CarouselItem } from "./Carousel.vue";

  const carouselItems: CarouselItem[] = [
    {
      title: "Custom Item",
      description: "A custom carousel item.",
      id: 1,
      icon: "circle",
    },
    {
      title: "Another Item",
      description: "Another carousel item.",
      id: 2,
      icon: "layers",
    },
    // Add more items as needed
  ];
</script>`,
  code
};
