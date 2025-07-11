<template>
  <div class="glitch-text-demo">
    <TabbedLayout>
      <template #preview>
        <div class="demo-container relative min-h-[500px] flex items-center justify-center overflow-hidden">
          <RefreshButton @click="forceRerender" />
          <div :key="key" class="text-center">
            <GlitchText
              :text="enableOnHover ? 'Hover Me' : 'vue-bits'"
              :speed="speed"
              :enable-shadows="enableShadows"
              :enable-on-hover="enableOnHover"
              class-name="demo-glitch-text"
            />
          </div>
        </div>

        <Customize>
          <PreviewSlider
            title="Animation Speed"
            v-model="speed"
            :min="0.1"
            :max="5"
            :step="0.1"
            value-unit="s"
            @update:model-value="forceRerender"
          />

          <PreviewSwitch 
            title="Glitch Colors" 
            v-model="enableShadows" 
            @update:model-value="forceRerender" 
          />
          
          <PreviewSwitch 
            title="Glitch On Hover" 
            v-model="enableOnHover" 
            @update:model-value="forceRerender" 
          />
        </Customize>

        <p class="demo-extra-info mt-4 flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd" />
          </svg>
          The glitch effect uses CSS pseudo-elements to create layered text distortions with different colors and animations.
        </p>

        <PropTable :data="propData" />
      </template>

      <template #code>
        <CodeExample :code-object="glitchText" />
      </template>

      <template #cli>
        <CliInstallation :command="glitchText.cli" />
      </template>
    </TabbedLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabbedLayout from '@/components/common/TabbedLayout.vue'
import PropTable from '@/components/common/PropTable.vue'
import CliInstallation from '@/components/code/CliInstallation.vue'
import CodeExample from '@/components/code/CodeExample.vue'
import Customize from '@/components/common/Customize.vue'
import PreviewSlider from '@/components/common/PreviewSlider.vue'
import PreviewSwitch from '@/components/common/PreviewSwitch.vue'
import RefreshButton from '@/components/common/RefreshButton.vue'
import GlitchText from '@/content/TextAnimations/GlitchText/GlitchText.vue'
import { glitchText } from '@/constants/code/TextAnimations/glitchTextCode'
import { useForceRerender } from '@/composables/useForceRerender'

const { rerenderKey: key, forceRerender } = useForceRerender()

const speed = ref(1)
const enableShadows = ref(true)
const enableOnHover = ref(false)

const propData = [
  {
    name: 'text',
    type: 'string',
    default: '""',
    description: 'The text content that will display the glitch effect.'
  },
  {
    name: 'speed',
    type: 'number',
    default: '1',
    description: 'Multiplier for the animation speed. Higher values slow down the glitch effect.'
  },
  {
    name: 'enableShadows',
    type: 'boolean',
    default: 'true',
    description: 'Toggle the colored text shadows on the glitch pseudo-elements.'
  },
  {
    name: 'enableOnHover',
    type: 'boolean',
    default: 'true',
    description: 'If true, the glitch animation is only activated on hover.'
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Additional custom classes to apply to the component.'
  }
]
</script>

<style scoped>
.demo-extra-info {
  color: #a1a1aa;
  font-size: 0.875rem;
}
</style>
