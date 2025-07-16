<template>
  <TabbedLayout>
    <template #preview>
      <div class="relative p-0 h-[500px] overflow-hidden demo-container">
        <LiquidChrome :baseColor="baseColor" :speed="speed" :amplitude="amplitude" :interactive="interactive" />
      </div>

      <Customize>
        <PreviewSlider
          :min="0"
          :max="1"
          :width="50"
          :step="0.1"
          v-model="baseColor[0]"
          title="Red"
          @onChange="
            (val: number) => {
              baseColor[0] = val;
            }
          "
        />

        <PreviewSlider
          :min="0"
          :max="1"
          :width="50"
          :step="0.1"
          v-model="baseColor[1]"
          title="Green"
          @onChange="
            (val: number) => {
              baseColor[1] = val;
            }
          "
        />

        <PreviewSlider
          :min="0"
          :max="1"
          :width="50"
          :step="0.1"
          v-model="baseColor[2]"
          title="Blue"
          @onChange="
            (val: number) => {
              baseColor[2] = val;
            }
          "
        />

        <PreviewSlider
          :min="0"
          title="Speed"
          :max="5"
          :step="0.01"
          v-model="speed"
          @update:model-value="
            (val: number) => {
              speed = val;
            }
          "
        />

        <PreviewSlider
          :min="0.1"
          title="Amplitude"
          :max="1"
          :step="0.01"
          v-model="amplitude"
          @update:model-value="
            val => {
              amplitude = val;
            }
          "
        />

        <PreviewSwitch title="Enable Interaction" v-model="interactive" @update:model-value="forceRerender" />
      </Customize>

      <PropTable :data="propData" />
      <Dependencies :dependency-list="['ogl']" />
    </template>

    <template #code>
      <CodeExample :code-object="liquidChrome" />
    </template>

    <template #cli>
      <CliInstallation :command="liquidChrome.cli" />
    </template>
  </TabbedLayout>
</template>

<script setup lang="ts">
import { useForceRerender } from '@/composables/useForceRerender';
import { ref, watch } from 'vue';
import CliInstallation from '../../components/code/CliInstallation.vue';
import CodeExample from '../../components/code/CodeExample.vue';
import Dependencies from '../../components/code/Dependencies.vue';
import Customize from '../../components/common/Customize.vue';
import PreviewSlider from '../../components/common/PreviewSlider.vue';
import PreviewSwitch from '../../components/common/PreviewSwitch.vue';
import PropTable from '../../components/common/PropTable.vue';
import TabbedLayout from '../../components/common/TabbedLayout.vue';
import { liquidChrome } from '../../constants/code/Backgrounds/liquidChromeCode';
import LiquidChrome from '../../content/Backgrounds/LiquidChrome/LiquidChrome.vue';

const { forceRerender } = useForceRerender();

const speed = ref(0.3);
const baseColor = ref([0.1, 0.1, 0.1]);
const interactive = ref(true);
const amplitude = ref(0.3);

watch(
  [baseColor, speed, amplitude, interactive],
  () => {
    forceRerender();
  },
  { deep: true }
);

const propData = [
  {
    name: 'baseColor',
    type: 'RGB array (number[3])',
    default: '[0.1, 0.1, 0.1]',
    description: 'Base color of the component. Specify as an RGB array.'
  },
  {
    name: 'speed',
    type: 'number',
    default: '1.0',
    description: 'Animation speed multiplier.'
  },
  {
    name: 'amplitude',
    type: 'number',
    default: '0.6',
    description: 'Amplitude of the distortion.'
  },
  {
    name: 'frequencyX',
    type: 'number',
    default: '2.5',
    description: 'Frequency modifier for the x distortion.'
  },
  {
    name: 'frequencyY',
    type: 'number',
    default: '1.5',
    description: 'Frequency modifier for the y distortion.'
  },
  {
    name: 'interactive',
    type: 'boolean',
    default: 'true',
    description: 'Enable mouse/touch interaction.'
  }
];
</script>
