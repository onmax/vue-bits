import code from '@/content/Animations/Ribbons/Ribbons.vue?raw'
import type { CodeObject } from '@/types/code'

export const ribbons: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/Ribbons`,
  usage: `<template>
  <!-- Corner Ribbon -->
  <div class="relative bg-white border rounded-lg h-40 overflow-hidden">
    <Ribbons 
      text="NEW" 
      variant="corner" 
      position="top-right" 
      color="red" 
      size="md"
      :animated="true"
    />
    <div class="p-4">
      <h3 class="font-semibold">Product Card</h3>
      <p class="text-gray-600">With corner ribbon</p>
    </div>
  </div>

  <!-- Banner Ribbon -->
  <div class="relative bg-white border rounded-lg h-40 overflow-hidden">
    <Ribbons 
      text="FEATURED" 
      variant="banner" 
      position="top" 
      color="blue" 
      size="lg"
    />
    <div class="p-4 pt-12">
      <h3 class="font-semibold">Featured Content</h3>
      <p class="text-gray-600">With banner ribbon</p>
    </div>
  </div>

  <!-- Side Ribbon -->
  <div class="relative bg-white border rounded-lg h-40 overflow-hidden">
    <Ribbons 
      text="OFFER" 
      variant="side" 
      position="left" 
      color="green"
    />
    <div class="p-4 pl-20">
      <h3 class="font-semibold">Special Offer</h3>
      <p class="text-gray-600">With side ribbon</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Ribbons from "./Ribbons.vue";
</script>`,
  code
}