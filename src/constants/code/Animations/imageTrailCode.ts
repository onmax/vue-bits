import code from '@/content/Animations/ImageTrail/ImageTrail.vue?raw';
import type { CodeObject } from '../../../types/code';

export const imageTrail: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/ImageTrail`,
  installation: `npm i gsap`,
  usage: `<template>
  <div :style="{ height: '500px', position: 'relative', overflow: 'hidden'}">
    <ImageTrail
        :key="key"
        :items="[
            'https://picsum.photos/id/287/300/300',
            'https://picsum.photos/id/1001/300/300',
            'https://picsum.photos/id/1025/300/300',
            'https://picsum.photos/id/1026/300/300',
            'https://picsum.photos/id/1027/300/300',
            'https://picsum.photos/id/1028/300/300',
            'https://picsum.photos/id/1029/300/300',
            'https://picsum.photos/id/1030/300/300',
        ]"
        :variant="1"
    />
    </div>
</template>

<script setup lang="ts">
  import ImageTrail from "./ImageTrail.vue";
</script>`,
  code
};
