<template>
  <div class="variable-proximity-demo">
    <TabbedLayout>
      <template #preview>
        <div class="demo-container">
          <RefreshButton @refresh="forceRerender" />

          <VariableProximity
            :key="rerenderKey"
            :text="text"
            :radius="radius"
            :max-scale="maxScale"
            :min-scale="minScale"
            :max-opacity="maxOpacity"
            :min-opacity="minOpacity"
            :max-font-size="maxFontSize"
            :min-font-size="minFontSize"
            :max-translate-y="maxTranslateY"
            :min-translate-y="minTranslateY"
            :color-intensity="colorIntensity"
            :shadow-intensity="shadowIntensity"
            :animation-type="animationType"
            :interactive="interactive"
            :highlight-color="highlightColor"
            :shadow-color="shadowColor"
            :text-align="textAlign"
            class="variable-proximity-demo-text"
            @proximity-change="handleProximityChange"
          />
        </div>

        <Customize>
          <PreviewSwitch title="Interactive Mode" v-model="interactive" @update:model-value="forceRerender" />

          <div class="flex gap-4 flex-wrap">
            <button
              class="text-xs bg-[#0b0b0b] rounded-[10px] border border-[#1e3721] hover:bg-[#1e3721] text-white h-8 px-3 transition-colors"
              @click="toggleAnimationType">
              Animation: <span class="text-[#a1a1aa]">&nbsp;{{ animationType }}</span>
            </button>
            <button
              class="text-xs bg-[#0b0b0b] rounded-[10px] border border-[#1e3721] hover:bg-[#1e3721] text-white h-8 px-3 transition-colors"
              @click="toggleTextAlign">
              Align: <span class="text-[#a1a1aa]">&nbsp;{{ textAlign }}</span>
            </button>
          </div>

          <PreviewSlider title="Radius (px)" v-model="radius" :min="50" :max="200" :step="10"
            @update:model-value="forceRerender" />

          <PreviewSlider title="Max Scale" v-model="maxScale" :min="1" :max="3" :step="0.1"
            @update:model-value="forceRerender" />

          <PreviewSlider title="Min Opacity" v-model="minOpacity" :min="0.1" :max="1" :step="0.1"
            @update:model-value="forceRerender" />

          <PreviewSlider title="Max Font Size" v-model="maxFontSize" :min="1" :max="2" :step="0.1"
            @update:model-value="forceRerender" />

          <PreviewSlider title="Color Intensity" v-model="colorIntensity" :min="0" :max="1" :step="0.1"
            @update:model-value="forceRerender" />
        </Customize>

        <PropTable :data="propData" />
        <Dependencies :dependency-list="[]" />
      </template>

      <template #code>
        <CodeExample :code-object="variableProximity" />
      </template>

      <template #cli>
        <CliInstallation :command="variableProximity.cli" />
      </template>
    </TabbedLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabbedLayout from '../../components/common/TabbedLayout.vue'
import RefreshButton from '../../components/common/RefreshButton.vue'
import PropTable from '../../components/common/PropTable.vue'
import Dependencies from '../../components/code/Dependencies.vue'
import CliInstallation from '../../components/code/CliInstallation.vue'
import CodeExample from '../../components/code/CodeExample.vue'
import Customize from '../../components/common/Customize.vue'
import PreviewSwitch from '../../components/common/PreviewSwitch.vue'
import PreviewSlider from '../../components/common/PreviewSlider.vue'
import VariableProximity from '../../content/TextAnimations/VariableProximity/VariableProximity.vue'
import { variableProximity } from '@/constants/code/TextAnimations/variableProximityCode'
import { useForceRerender } from '@/composables/useForceRerender'

const text = ref('Hover over this text to see the proximity effects in action!')
const radius = ref(100)
const maxScale = ref(1.5)
const minScale = ref(1)
const maxOpacity = ref(1)
const minOpacity = ref(0.3)
const maxFontSize = ref(1.2)
const minFontSize = ref(1)
const maxTranslateY = ref(-10)
const minTranslateY = ref(0)
const colorIntensity = ref(0.8)
const shadowIntensity = ref(0.8)
const animationType = ref<'scale' | 'opacity' | 'fontSize' | 'color' | 'shadow' | 'translateY' | 'all'>('all')
const interactive = ref(true)
const highlightColor = ref('#27FF64')
const shadowColor = ref('#27FF64')
const textAlign = ref<'left' | 'center' | 'right' | 'justify'>('center')

const { rerenderKey, forceRerender } = useForceRerender()

const toggleAnimationType = () => {
  const types: Array<'scale' | 'opacity' | 'fontSize' | 'color' | 'shadow' | 'translateY' | 'all'> = ['all', 'scale', 'opacity', 'fontSize', 'color', 'shadow', 'translateY']
  const currentIndex = types.indexOf(animationType.value)
  animationType.value = types[(currentIndex + 1) % types.length]
  forceRerender()
}

const toggleTextAlign = () => {
  const alignments: Array<'left' | 'center' | 'right' | 'justify'> = ['center', 'left', 'right', 'justify']
  const currentIndex = alignments.indexOf(textAlign.value)
  textAlign.value = alignments[(currentIndex + 1) % alignments.length]
  forceRerender()
}

const handleProximityChange = (data: { index: number; distance: number; intensity: number }) => {
  console.log('Proximity change:', data)
}

const propData = [
  { name: 'text', type: 'string', default: '""', description: 'Text to be animated with proximity effects.' },
  { name: 'className', type: 'string', default: '""', description: 'Additional CSS class name.' },
  { name: 'radius', type: 'number', default: '100', description: 'Proximity radius in pixels.' },
  { name: 'maxScale', type: 'number', default: '1.5', description: 'Maximum scale factor.' },
  { name: 'minScale', type: 'number', default: '1', description: 'Minimum scale factor.' },
  { name: 'maxOpacity', type: 'number', default: '1', description: 'Maximum opacity.' },
  { name: 'minOpacity', type: 'number', default: '0.3', description: 'Minimum opacity.' },
  { name: 'maxFontSize', type: 'number', default: '1.2', description: 'Maximum font size multiplier.' },
  { name: 'minFontSize', type: 'number', default: '1', description: 'Minimum font size multiplier.' },
  { name: 'maxTranslateY', type: 'number', default: '-10', description: 'Maximum Y translation in pixels.' },
  { name: 'minTranslateY', type: 'number', default: '0', description: 'Minimum Y translation in pixels.' },
  { name: 'colorIntensity', type: 'number', default: '0.8', description: 'Color effect intensity.' },
  { name: 'shadowIntensity', type: 'number', default: '0.8', description: 'Shadow effect intensity.' },
  { name: 'easing', type: 'string', default: '"cubic-bezier(0.23, 1, 0.32, 1)"', description: 'CSS easing function.' },
  { name: 'duration', type: 'number', default: '300', description: 'Animation duration in milliseconds.' },
  { name: 'textAlign', type: 'string', default: '"center"', description: 'Text alignment.' },
  { name: 'animationType', type: 'string', default: '"all"', description: 'Type of animation effects.' },
  { name: 'interactive', type: 'boolean', default: 'true', description: 'Enable mouse interaction.' },
  { name: 'highlightColor', type: 'string', default: '"#27FF64"', description: 'Highlight color for effects.' },
  { name: 'shadowColor', type: 'string', default: '"#27FF64"', description: 'Shadow color for effects.' }
]
</script>

<style scoped>
.variable-proximity-demo-text {
  max-width: 20ch;
  line-height: 100%;
  font-size: 4rem !important;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  color: var(--colors-neutral-100);
}

@media (max-width: 768px) {
  .variable-proximity-demo-text {
    font-size: 1.6rem !important;
  }
}
</style>