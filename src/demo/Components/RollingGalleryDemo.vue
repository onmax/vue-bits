<template>
  <div class="rolling-gallery-demo">
    <TabbedLayout>
      <template #preview>
        <div class="demo-container" style="background: #060010; overflow: hidden; position: relative; min-height: 500px;">
          <div class="flex h-full max-w-[600px] items-center justify-center flex-col">
            <h2 class="mt-6 text-center absolute font-black top-4 md:top-4 whitespace-nowrap text-2xl md:text-5xl text-white">
              Your trip to Thailand.
            </h2>
            <RollingGallery
              :autoplay="autoplay"
              :pause-on-hover="pauseOnHover"
              :images="customImages.length > 0 ? customImages : undefined"
            />
          </div>
        </div>

        <Customize>
          <PreviewSwitch
            title="Autoplay"
            v-model="autoplay"
          />

          <PreviewSwitch
            title="Pause on Hover"
            v-model="pauseOnHover"
          />
        </Customize>

        <PropTable :data="propData" />
        <Dependencies :dependency-list="['motion-v']" />
      </template>

      <template #code>
        <CodeExample :code-object="rollingGallery" />
      </template>

      <template #cli>
        <CliInstallation :command="rollingGallery.cli" />
      </template>
    </TabbedLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabbedLayout from '@/components/common/TabbedLayout.vue'
import PropTable from '@/components/common/PropTable.vue'
import Dependencies from '@/components/code/Dependencies.vue'
import CliInstallation from '@/components/code/CliInstallation.vue'
import CodeExample from '@/components/code/CodeExample.vue'
import Customize from '@/components/common/Customize.vue'
import PreviewSwitch from '@/components/common/PreviewSwitch.vue'
import RollingGallery from '@/content/Components/RollingGallery/RollingGallery.vue'
import { rollingGallery } from '@/constants/code/Components/rollingGalleryCode'

const autoplay = ref(true)
const pauseOnHover = ref(true)
const customImages = ref<string[]>([])

const propData = [
  {
    name: 'autoplay',
    type: 'boolean',
    default: 'false',
    description: 'Controls the autoplay toggle of the carousel. When turned on, it rotates and loops infinitely.',
  },
  {
    name: 'pauseOnHover',
    type: 'boolean',
    default: 'false',
    description: 'Allows the carousel to be paused on hover when autoplay is turned on.',
  },
  {
    name: 'images',
    type: 'string[]',
    default: '[]',
    description: 'Array of image URLs to display in the gallery.',
  },
]
</script>

<style scoped>
.rolling-gallery-demo {
  width: 100%;
}

.demo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
</style>
