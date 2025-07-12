<template>
  <div class="splash-cursor-demo">
    <TabbedLayout>
      <template #preview>
        <div class="demo-container">
          <SplashCursor 
            :key="rerenderKey" 
            :trail-color="trailColor" 
            :trail-length="trailLength"
            :dot-size="dotSize" 
            :animation-speed="animationSpeed" 
            :fade-speed="fadeSpeed"
            :scale-variation="scaleVariation" 
            :delay-between-dots="delayBetweenDots"
            class="splash-cursor-demo-area"
          >
            <div class="demo-content">
              <div class="demo-text">
                <h3>Move Your Mouse</h3>
                <p>Experience the smooth cursor trail effect</p>
              </div>
            </div>
          </SplashCursor>
        </div>

        <Customize>
          <PreviewColor title="Trail Color" v-model="trailColor" @update:model-value="forceRerender" />

          <PreviewSlider 
            title="Trail Length" 
            v-model="trailLength" 
            :min="3" 
            :max="25" 
            :step="1"
            @update:model-value="forceRerender" 
          />

          <PreviewSlider 
            title="Dot Size" 
            v-model="dotSize" 
            :min="4" 
            :max="20" 
            :step="1"
            @update:model-value="forceRerender" 
          />

          <PreviewSlider 
            title="Animation Speed" 
            v-model="animationSpeed" 
            :min="0.05" 
            :max="0.5" 
            :step="0.05"
            @update:model-value="forceRerender" 
          />

          <PreviewSlider 
            title="Fade Speed" 
            v-model="fadeSpeed" 
            :min="0.01" 
            :max="0.1" 
            :step="0.01"
            @update:model-value="forceRerender" 
          />

          <PreviewSlider 
            title="Scale Variation" 
            v-model="scaleVariation" 
            :min="0.2" 
            :max="1" 
            :step="0.1"
            @update:model-value="forceRerender" 
          />

          <PreviewSlider 
            title="Delay Between Dots (ms)" 
            v-model="delayBetweenDots" 
            :min="10" 
            :max="100" 
            :step="10"
            @update:model-value="forceRerender" 
          />
        </Customize>

        <PropTable :data="propData" />
      </template>

      <template #code>
        <CodeExample :code-object="splashCursor" />
      </template>

      <template #cli>
        <CliInstallation :command="splashCursor.cli" />
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
import SplashCursor from '../../content/Animations/SplashCursor/SplashCursor.vue'
import { splashCursor } from '@/constants/code/Animations/splashCursorCode'
import { useForceRerender } from '@/composables/useForceRerender'

const trailColor = ref('#ffffff')
const trailLength = ref(12)
const dotSize = ref(8)
const animationSpeed = ref(0.15)
const fadeSpeed = ref(0.02)
const scaleVariation = ref(0.8)
const delayBetweenDots = ref(50)
const { rerenderKey, forceRerender } = useForceRerender()

const propData = [
  { 
    name: 'trailColor', 
    type: 'string', 
    default: "'#ffffff'", 
    description: 'Color of the trailing dots in hex format.' 
  },
  { 
    name: 'trailLength', 
    type: 'number', 
    default: '12', 
    description: 'Number of dots in the trail.' 
  },
  { 
    name: 'dotSize', 
    type: 'number', 
    default: '8', 
    description: 'Size of each dot in pixels.' 
  },
  { 
    name: 'animationSpeed', 
    type: 'number', 
    default: '0.15', 
    description: 'Speed of the trailing animation (0.01 to 1.0).' 
  },
  { 
    name: 'fadeSpeed', 
    type: 'number', 
    default: '0.02', 
    description: 'Speed at which dots fade out when mouse leaves.' 
  },
  { 
    name: 'scaleVariation', 
    type: 'number', 
    default: '0.8', 
    description: 'How much smaller trailing dots get (0.0 to 1.0).' 
  },
  { 
    name: 'delayBetweenDots', 
    type: 'number', 
    default: '50', 
    description: 'Delay between dot animations in milliseconds.' 
  }
]
</script>

<style scoped>
.splash-cursor-demo-area {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  overflow: hidden;
}

.demo-content {
  position: relative;
  z-index: 1;
  pointer-events: none;
}

.demo-text {
  text-align: center;
  user-select: none;
}

.demo-text h3 {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.demo-text p {
  font-size: 1rem;
  color: #e0e0e0;
  margin: 0;
  opacity: 0.9;
}

.demo-container {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}
</style>