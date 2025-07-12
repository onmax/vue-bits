<template>
  <div class="metallic-paint-demo">
    <TabbedLayout>
      <template #preview>
        <h2 class="demo-title-extra">Default</h2>
        <div class="demo-container relative">
          <MetallicPaint
            :key="keyDefault"
            class-name="demo-card"
            :auto-play="true"
            trigger="auto"
            :speed="2"
            color="#c0c0c0"
            :intensity="0.8"
          >
            <div class="demo-content">
              <h3>Metallic Paint Effect</h3>
              <p>This is a demo of the metallic paint animation</p>
            </div>
          </MetallicPaint>

          <RefreshButton @click="forceRerenderDefault" />
        </div>

        <h2 class="demo-title-extra">Hover Trigger</h2>
        <div class="demo-container relative">
          <MetallicPaint
            :key="keyHover"
            class-name="demo-card"
            :auto-play="false"
            trigger="hover"
            :speed="1.5"
            color="#ffd700"
            :intensity="0.6"
          >
            <div class="demo-content">
              <h3>Hover to Trigger</h3>
              <p>Move your mouse over this card</p>
            </div>
          </MetallicPaint>

          <RefreshButton @click="forceRerenderHover" />
        </div>

        <h2 class="demo-title-extra">Click Trigger</h2>
        <div class="demo-container relative">
          <MetallicPaint
            :key="keyClick"
            class-name="demo-card"
            :auto-play="false"
            trigger="click"
            :speed="1"
            color="#ff6b6b"
            :intensity="0.9"
          >
            <div class="demo-content">
              <h3>Click to Trigger</h3>
              <p>Click this card to see the effect</p>
            </div>
          </MetallicPaint>

          <RefreshButton @click="forceRerenderClick" />
        </div>

        <PropTable :data="propData" />
      </template>

      <template #code>
        <CodeExample :code-object="metallicpaint" />
      </template>

      <template #cli>
        <CliInstallation :command="metallicpaint.cli" />
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
import MetallicPaint from '../../content/Animations/MetallicPaint/MetallicPaint.vue'
import { metallicpaint } from '@/constants/code/Animations/metallicPaintCode'
import { useForceRerender } from '@/composables/useForceRerender'

const { rerenderKey: keyDefault, forceRerender: forceRerenderDefault } = useForceRerender()
const { rerenderKey: keyHover, forceRerender: forceRerenderHover } = useForceRerender()
const { rerenderKey: keyClick, forceRerender: forceRerenderClick } = useForceRerender()

const propData = [
  {
    name: 'color',
    type: 'string',
    default: '"#c0c0c0"',
    description: 'The metallic color to use for the paint effect.'
  },
  {
    name: 'intensity',
    type: 'number',
    default: '0.8',
    description: 'The intensity of the metallic shine effect (0-1).'
  },
  {
    name: 'speed',
    type: 'number',
    default: '2',
    description: 'Duration of the animation in seconds.'
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'CSS class to apply to the component for additional styling.'
  },
  {
    name: 'autoPlay',
    type: 'boolean',
    default: 'true',
    description: 'Whether the animation should start automatically when mounted.'
  },
  {
    name: 'trigger',
    type: 'string',
    default: '"auto"',
    description: 'How the animation is triggered: "auto", "hover", or "click".'
  }
]
</script>

<style scoped>
.demo-container {
  min-height: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-card {
  width: 300px;
  height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.demo-card:hover {
  transform: translateY(-2px);
}

.demo-content {
  padding: 20px;
  color: white;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.demo-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.2em;
  font-weight: 600;
}

.demo-content p {
  margin: 0;
  font-size: 0.9em;
  opacity: 0.9;
}
</style>