<template>
  <div class="crosshair-demo">
    <TabbedLayout>
      <template #preview>
        <h2 class="demo-title-extra">Default Crosshair</h2>
        <div class="demo-container relative">
          <div class="demo-content">
            <p>Move your mouse around to see the crosshair effect.</p>
            <button class="demo-button">Hover over me</button>
            <a href="#" class="demo-link">Or this link</a>
          </div>
          <Crosshair
            :key="keyDefault"
            variant="default"
            :size="40"
            color="#6366f1"
            :opacity="0.8"
            :smoothness="0.15"
            :hover-scale="1.5"
          />
        </div>

        <h2 class="demo-title-extra">Dot Variant</h2>
        <div class="demo-container relative">
          <div class="demo-content">
            <p>Simple dot that follows your cursor.</p>
            <button class="demo-button">Interactive element</button>
          </div>
          <Crosshair
            :key="keyDot"
            variant="dot"
            :size="20"
            color="#ef4444"
            :opacity="0.9"
            :smoothness="0.2"
            :hover-scale="2"
          />
        </div>

        <h2 class="demo-title-extra">Crosshair Variant</h2>
        <div class="demo-container relative">
          <div class="demo-content">
            <p>Traditional crosshair design.</p>
            <button class="demo-button">Hover target</button>
          </div>
          <Crosshair
            :key="keyCrosshair"
            variant="crosshair"
            :size="30"
            color="#10b981"
            :opacity="0.7"
            :smoothness="0.1"
            :hover-scale="1.8"
          />
        </div>

        <h2 class="demo-title-extra">Ring Variant</h2>
        <div class="demo-container relative">
          <div class="demo-content">
            <p>Minimalist ring cursor.</p>
            <button class="demo-button">Test interaction</button>
          </div>
          <Crosshair
            :key="keyRing"
            variant="ring"
            :size="35"
            color="#f59e0b"
            :opacity="0.8"
            :smoothness="0.12"
            :hover-scale="1.6"
            :stroke-width="3"
          />
        </div>

        <h2 class="demo-title-extra">Custom Blend Mode</h2>
        <div class="demo-container relative bg-gradient-to-br from-purple-500 to-pink-500">
          <div class="demo-content text-white">
            <p>Crosshair with difference blend mode.</p>
            <button class="demo-button bg-white text-black">White button</button>
          </div>
          <Crosshair
            :key="keyBlend"
            variant="default"
            :size="45"
            color="#ffffff"
            :opacity="1"
            :smoothness="0.08"
            :hover-scale="2"
            blend-mode="difference"
          />
        </div>

        <PropTable :data="propData" />
      </template>

      <template #code>
        <CodeExample :code-object="crosshair" />
      </template>

      <template #cli>
        <CliInstallation :command="crosshair.cli" />
      </template>
    </TabbedLayout>
  </div>
</template>

<script setup lang="ts">
import TabbedLayout from '../../components/common/TabbedLayout.vue'
import PropTable from '../../components/common/PropTable.vue'
import CliInstallation from '../../components/code/CliInstallation.vue'
import CodeExample from '../../components/code/CodeExample.vue'
import Crosshair from '../../content/Animations/Crosshair/Crosshair.vue'
import { crosshair } from '@/constants/code/Animations/crosshairCode'
import { useForceRerender } from '@/composables/useForceRerender'

const { rerenderKey: keyDefault } = useForceRerender()
const { rerenderKey: keyDot } = useForceRerender()
const { rerenderKey: keyCrosshair } = useForceRerender()
const { rerenderKey: keyRing } = useForceRerender()
const { rerenderKey: keyBlend } = useForceRerender()

const propData = [
  {
    name: 'variant',
    type: 'string',
    default: '"default"',
    description: 'Style variant of the crosshair. Options: "default", "dot", "crosshair", "ring".'
  },
  {
    name: 'size',
    type: 'number',
    default: '40',
    description: 'Size of the crosshair in pixels.'
  },
  {
    name: 'strokeWidth',
    type: 'number',
    default: '2',
    description: 'Width of the stroke for border elements.'
  },
  {
    name: 'color',
    type: 'string',
    default: '"#000000"',
    description: 'Color of the crosshair in hex format.'
  },
  {
    name: 'opacity',
    type: 'number',
    default: '0.8',
    description: 'Opacity of the crosshair (0-1).'
  },
  {
    name: 'smoothness',
    type: 'number',
    default: '0.15',
    description: 'Smoothness of the animation (0-1). Lower values = smoother.'
  },
  {
    name: 'hoverScale',
    type: 'number',
    default: '1.5',
    description: 'Scale factor when hovering over interactive elements.'
  },
  {
    name: 'hoverTargets',
    type: 'string[]',
    default: '["a", "button", "[role=\\"button\\"]"]',
    description: 'CSS selectors for elements that trigger hover effects.'
  },
  {
    name: 'hideOnLeave',
    type: 'boolean',
    default: 'true',
    description: 'Whether to hide the crosshair when mouse leaves the viewport.'
  },
  {
    name: 'blendMode',
    type: 'string',
    default: '"difference"',
    description: 'CSS blend mode for the crosshair.'
  }
]
</script>

<style scoped>
.demo-container {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.demo-content {
  text-align: center;
  padding: 2rem;
}

.demo-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.demo-button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.demo-link {
  color: #6366f1;
  text-decoration: underline;
  margin-left: 1rem;
  font-weight: 500;
}

.demo-link:hover {
  color: #4f46e5;
}
</style>