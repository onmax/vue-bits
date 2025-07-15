<template>
  <div class="aurora-demo">
    <TabbedLayout>
      <template #preview>
        <div class="demo-container">
          <Aurora
            :color-stops="colorStops"
            :amplitude="amplitude"
            :blend="blend"
            :speed="speed"
            :intensity="intensity"
            class="w-full"
          />
        </div>

        <Customize>
          <div class="flex gap-2">
            <PreviewColor
              v-for="(color, index) in colorStops"
              :key="index"
              :title="`Color ${index + 1}`"
              :model-value="color"
              @update:model-value="value => updateColorStop(index, value)"
            />
          </div>

          <PreviewSlider
            title="Amplitude"
            :model-value="amplitude"
            @update:model-value="amplitude = $event"
            :min="0"
            :max="2"
            :step="0.1"
          />

          <PreviewSlider
            title="Blend"
            :model-value="blend"
            @update:model-value="blend = $event"
            :min="0"
            :max="1"
            :step="0.1"
          />

          <PreviewSlider
            title="Speed"
            :model-value="speed"
            @update:model-value="speed = $event"
            :min="0"
            :max="3"
            :step="0.1"
          />

          <PreviewSlider
            title="Intensity"
            :model-value="intensity"
            @update:model-value="intensity = $event"
            :min="0"
            :max="2"
            :step="0.1"
          />
        </Customize>

        <PropTable :data="propData" />

        <Dependencies :dependency-list="['ogl']" />
      </template>

      <template #code>
        <CodeExample :code-object="aurora" />
      </template>

      <template #cli>
        <CliInstallation :command="aurora.cli" />
      </template>
    </TabbedLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabbedLayout from '../../components/common/TabbedLayout.vue';
import PropTable from '../../components/common/PropTable.vue';
import Dependencies from '../../components/code/Dependencies.vue';
import CliInstallation from '../../components/code/CliInstallation.vue';
import CodeExample from '../../components/code/CodeExample.vue';
import Customize from '../../components/common/Customize.vue';
import Aurora from '@/content/Backgrounds/Aurora/Aurora.vue';
import PreviewColor from '@/components/common/PreviewColor.vue';
import PreviewSlider from '@/components/common/PreviewSlider.vue';
import { aurora } from '@/constants/code/Backgrounds/auroraCode';

const colorStops = ref(['#171D22', '#7cff67', '#171D22']);
const amplitude = ref(1.0);
const blend = ref(0.5);
const speed = ref(1.0);
const intensity = ref(1.0);

const updateColorStop = (index: number, color: string) => {
  colorStops.value[index] = color;
};

const propData = [
  {
    name: 'colorStops',
    type: 'string[]',
    default: "['#171D22', '#7cff67', '#171D22']",
    description: 'Array of color stops for the aurora gradient.'
  },
  {
    name: 'amplitude',
    type: 'number',
    default: '1.0',
    description: 'Controls the height variation of the aurora effect.'
  },
  {
    name: 'blend',
    type: 'number',
    default: '0.5',
    description: 'Controls the blending/smoothness of the aurora effect.'
  },
  { name: 'speed', type: 'number', default: '1.0', description: 'Controls the animation speed of the aurora effect.' },
  {
    name: 'intensity',
    type: 'number',
    default: '1.0',
    description: 'Controls the overall intensity/opacity of the aurora effect.'
  },
  { name: 'time', type: 'number', default: 'undefined', description: 'Optional time override for the animation.' },
  { name: 'className', type: 'string', default: '""', description: 'Additional CSS class names for styling.' },
  { name: 'style', type: 'CSSProperties', default: '{}', description: 'Inline styles for the component.' }
];
</script>

<style scoped>
.demo-container {
  overflow: hidden;
  padding: 0;
}
</style>
