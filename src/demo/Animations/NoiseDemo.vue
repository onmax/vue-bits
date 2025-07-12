<template>
  <div class="noise-demo">
    <TabbedLayout>
      <template #preview>
        <h2 class="demo-title-extra">Default</h2>
        <div class="demo-container relative">
          <Noise :key="keyDefault" class="w-full h-full" />
          <RefreshButton @click="forceRerenderDefault" />
        </div>

        <h2 class="demo-title-extra">Custom Colors</h2>
        <div class="demo-container relative">
          <Noise :key="keyCustom" color="#ff6b6b" :intensity="1.5" :frequency="0.8" class="w-full h-full" />
          <RefreshButton @click="forceRerenderCustom" />
        </div>

        <h2 class="demo-title-extra">Animated</h2>
        <div class="demo-container relative">
          <Noise :key="keyAnimated" color="#4ecdc4" :speed="2" :scale="1.5" :intensity="0.8" class="w-full h-full" />
          <RefreshButton @click="forceRerenderAnimated" />
        </div>

        <PropTable :data="propData" />
      </template>

      <template #code>
        <CodeExample :code-object="noise" />
      </template>

      <template #cli>
        <CliInstallation :command="noise.cli" />
      </template>
    </TabbedLayout>
  </div>
</template>

<script setup lang="ts">
import TabbedLayout from '../../components/common/TabbedLayout.vue'
import PropTable from '../../components/common/PropTable.vue'
import CliInstallation from '../../components/code/CliInstallation.vue'
import CodeExample from '../../components/code/CodeExample.vue'
import RefreshButton from '../../components/common/RefreshButton.vue'
import Noise from '../../content/Animations/Noise/Noise.vue'
import { noise } from '@/constants/code/Animations/noiseCode'
import { useForceRerender } from '@/composables/useForceRerender'

const { rerenderKey: keyDefault, forceRerender: forceRerenderDefault } = useForceRerender()
const { rerenderKey: keyCustom, forceRerender: forceRerenderCustom } = useForceRerender()
const { rerenderKey: keyAnimated, forceRerender: forceRerenderAnimated } = useForceRerender()

const propData = [
  {
    name: 'speed',
    type: 'number',
    default: '1',
    description: 'The speed of the noise animation.'
  },
  {
    name: 'scale',
    type: 'number',
    default: '1',
    description: 'The scale of the noise pattern.'
  },
  {
    name: 'color',
    type: 'string',
    default: '"#ffffff"',
    description: 'The color of the noise effect in hex format.'
  },
  {
    name: 'intensity',
    type: 'number',
    default: '1',
    description: 'The intensity of the noise effect.'
  },
  {
    name: 'frequency',
    type: 'number',
    default: '0.5',
    description: 'The frequency of the noise pattern.'
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'CSS class to apply to the component for additional styling.'
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: '{}',
    description: 'Inline styles to apply to the component.'
  }
]
</script>

<style scoped>
.demo-container {
  min-height: 300px;
  height: 300px;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}
</style>