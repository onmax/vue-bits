import code from '@/content/Animations/ImageTrail/ImageTrail.vue?raw'
import type { CodeObject } from '@/types/code'

export const imageTrail: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Animations/ImageTrail`,
  usage: `<template>
  <ImageTrail
    :images="images"
    :max-trail-length="8"
    :trail-spacing="40"
    :fade-out-duration="1000"
    :scale-effect="true"
    :rotation-effect="false"
    :image-size="60"
    :z-index="1000"
    class-name="custom-trail"
    :disabled="false"
  >
    <div class="content">
      <h2>Move your mouse around!</h2>
      <p>This area has an image trail effect.</p>
    </div>
  </ImageTrail>
</template>

<script setup lang="ts">
  import ImageTrail from "./ImageTrail.vue"
  
  // Example with different image sets
  const images = [
    "https://picsum.photos/100/100?random=1",
    "https://picsum.photos/100/100?random=2",
    "https://picsum.photos/100/100?random=3",
    "https://picsum.photos/100/100?random=4"
  ]
  
  // Example with emoji/icon images
  const emojiImages = [
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRkQ3MDAiLz4KPHRleHQgeD0iMzAiIHk9IjM4IiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5mAPC90ZXh0Pgo8L3N2Zz4K",
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRkQ3MDAiLz4KPHRleHQgeD0iMzAiIHk9IjM4IiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5mJPC90ZXh0Pgo8L3N2Zz4K"
  ]
  
  // Example with controlled animation
  const isDisabled = ref(false)
  
  const toggleTrail = () => {
    isDisabled.value = !isDisabled.value
  }
</script>

<style scoped>
  .content {
    padding: 2rem;
    text-align: center;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  /* Optional: Custom styling for the trail container */
  .custom-trail {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
</style>`,
  code
}