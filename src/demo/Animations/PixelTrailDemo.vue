<template>
  <div class="pixel-trail-demo">
    <TabbedLayout>
      <template #preview>
        <div class="demo-container">
          <PixelTrail 
            :key="rerenderKey" 
            :particle-color="particleColor" 
            :particle-size="particleSize" 
            :particle-count="particleCount"
            :trail-length="trailLength" 
            :fade-speed="fadeSpeed" 
            :spawn-rate="spawnRate" 
            :random-offset="randomOffset"
            :blend-mode="blendMode"
            class="pixel-trail-demo-area"
          >
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-[4rem] font-[900] text-[#222] select-none">
              Move Your Mouse!
            </div>
          </PixelTrail>
        </div>

        <Customize>
          <PreviewColor title="Particle Color" v-model="particleColor" @update:model-value="forceRerender" />

          <PreviewSlider title="Particle Size" v-model="particleSize" :min="1" :max="20" :step="1"
            @update:model-value="forceRerender" />

          <PreviewSlider title="Particle Count" v-model="particleCount" :min="10" :max="200" :step="10"
            @update:model-value="forceRerender" />

          <PreviewSlider title="Trail Length" v-model="trailLength" :min="5" :max="50" :step="5"
            @update:model-value="forceRerender" />

          <PreviewSlider title="Fade Speed" v-model="fadeSpeed" :min="0.01" :max="0.2" :step="0.01"
            @update:model-value="forceRerender" />

          <PreviewSlider title="Spawn Rate" v-model="spawnRate" :min="0.5" :max="10" :step="0.5"
            @update:model-value="forceRerender" />

          <PreviewSlider title="Random Offset" v-model="randomOffset" :min="0" :max="30" :step="2"
            @update:model-value="forceRerender" />

          <PreviewSelect title="Blend Mode" v-model="blendMode" :options="blendModeOptions"
            @update:model-value="forceRerender" />
        </Customize>

        <PropTable :data="propData" />
      </template>

      <template #code>
        <CodeExample :code-object="pixelTrail" />
      </template>

      <template #cli>
        <CliInstallation :command="pixelTrail.cli" />
      </template>
    </TabbedLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabbedLayout from '../../components/common/TabbedLayout.vue'
import PropTable from '../../components/common/PropTable.vue'
import CliInstallation from '../../components/code/CliInstallation.vue'
import CodeExample from '../../components/code/CodeExample.vue'
import Customize from '../../components/common/Customize.vue'
import PreviewColor from '../../components/common/PreviewColor.vue'
import PreviewSlider from '../../components/common/PreviewSlider.vue'
import PreviewSelect from '../../components/common/PreviewSelect.vue'
import PixelTrail from '../../content/Animations/PixelTrail/PixelTrail.vue'
import { pixelTrail } from '@/constants/code/Animations/pixelTrailCode'
import { useForceRerender } from '@/composables/useForceRerender'

const particleColor = ref('#ffffff')
const particleSize = ref(4)
const particleCount = ref(50)
const trailLength = ref(20)
const fadeSpeed = ref(0.05)
const spawnRate = ref(2)
const randomOffset = ref(10)
const blendMode = ref<GlobalCompositeOperation>('normal' as GlobalCompositeOperation)
const { rerenderKey, forceRerender } = useForceRerender()

const blendModeOptions = [
  { label: 'Normal', value: 'normal' as GlobalCompositeOperation },
  { label: 'Multiply', value: 'multiply' as GlobalCompositeOperation },
  { label: 'Screen', value: 'screen' as GlobalCompositeOperation },
  { label: 'Overlay', value: 'overlay' as GlobalCompositeOperation },
  { label: 'Darken', value: 'darken' as GlobalCompositeOperation },
  { label: 'Lighten', value: 'lighten' as GlobalCompositeOperation },
  { label: 'Color Dodge', value: 'color-dodge' as GlobalCompositeOperation },
  { label: 'Color Burn', value: 'color-burn' as GlobalCompositeOperation },
  { label: 'Hard Light', value: 'hard-light' as GlobalCompositeOperation },
  { label: 'Soft Light', value: 'soft-light' as GlobalCompositeOperation },
  { label: 'Difference', value: 'difference' as GlobalCompositeOperation },
  { label: 'Exclusion', value: 'exclusion' as GlobalCompositeOperation }
]

const propData = [
  { name: 'particleColor', type: 'string', default: "'#ffffff'", description: 'Color of the trail particles.' },
  { name: 'particleSize', type: 'number', default: '4', description: 'Size of each particle in pixels.' },
  { name: 'particleCount', type: 'number', default: '50', description: 'Maximum number of particles in the trail.' },
  { name: 'trailLength', type: 'number', default: '20', description: 'How long each particle lives (frames).' },
  { name: 'fadeSpeed', type: 'number', default: '0.05', description: 'Speed at which particles fade out.' },
  { name: 'spawnRate', type: 'number', default: '2', description: 'Number of particles spawned per second.' },
  { name: 'randomOffset', type: 'number', default: '10', description: 'Random offset applied to particle positions.' },
  { name: 'blendMode', type: 'string', default: "'normal'", description: 'Canvas blend mode for particle rendering.' }
]
</script>

<style scoped>
.pixel-trail-demo-area {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: crosshair;
  background: radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%);
}

.demo-container {
  width: 100%;
  height: 400px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #333;
}
</style>