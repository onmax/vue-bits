<template>
  <div class="letter-glitch-demo">
    <TabbedLayout>
      <template #preview>
        <div class="demo-container">
          <LetterGlitch
            :key="rerenderKey"
            :glitch-colors="colors"
            :glitch-speed="speed"
            :center-vignette="showCenterVignette"
            :outer-vignette="showOuterVignette"
            :smooth="smooth"
            class="w-full h-full"
          />
        </div>

        <Customize>
          <button
            @click="randomizeColors"
            class="px-3 py-2 text-xs bg-[#111] hover:bg-[#222] text-white rounded-lg border border-[#333] transition-colors"
          >
            Randomize Colors
          </button>

          <PreviewSlider
            title="Glitch Speed"
            :model-value="speed"
            @update:model-value="speed = $event"
            :min="0"
            :max="100"
            :step="5"
          />

          <PreviewSwitch title="Smooth Animation" :model-value="smooth" @update:model-value="updateSmooth" />

          <PreviewSwitch
            title="Show Center Vignette"
            :model-value="showCenterVignette"
            @update:model-value="updateCenterVignette"
          />

          <PreviewSwitch
            title="Show Outer Vignette"
            :model-value="showOuterVignette"
            @update:model-value="updateOuterVignette"
          />
        </Customize>

        <PropTable :data="propData" />

        <Dependencies :dependency-list="[]" />
      </template>

      <template #code>
        <CodeExample :code-object="letterGlitch" />
      </template>

      <template #cli>
        <CliInstallation :command="letterGlitch.cli" />
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
import LetterGlitch from '@/content/Backgrounds/LetterGlitch/LetterGlitch.vue';
import PreviewSlider from '@/components/common/PreviewSlider.vue';
import PreviewSwitch from '@/components/common/PreviewSwitch.vue';
import { letterGlitch } from '@/constants/code/Backgrounds/letterGlitchCode';
import { useForceRerender } from '@/composables/useForceRerender';

const smooth = ref(true);
const speed = ref(10);
const colors = ref(['#2b4539', '#61dca3', '#61b3dc']);
const showCenterVignette = ref(true);
const showOuterVignette = ref(false);

const { rerenderKey, forceRerender } = useForceRerender();

const randomHex = () => {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
};

const randomizeColors = () => {
  colors.value = [randomHex(), randomHex(), randomHex()];
  forceRerender();
};

const updateSmooth = (value: boolean) => {
  smooth.value = value;
  forceRerender();
};

const updateCenterVignette = (value: boolean) => {
  showCenterVignette.value = value;
  forceRerender();
};

const updateOuterVignette = (value: boolean) => {
  showOuterVignette.value = value;
  forceRerender();
};

const propData = [
  {
    name: 'glitchColors',
    type: 'string[]',
    default: "['#2b4539', '#61dca3', '#61b3dc']",
    description: 'Controls the colors of the letters rendered in the canvas.'
  },
  {
    name: 'glitchSpeed',
    type: 'number',
    default: '50',
    description: 'Controls the speed at which letters scramble in the animation.'
  },
  {
    name: 'centerVignette',
    type: 'boolean',
    default: 'false',
    description: 'When true, renders a radial gradient in the center of the container'
  },
  {
    name: 'outerVignette',
    type: 'boolean',
    default: 'true',
    description: 'When true, renders an inner radial gradient around the edges of the container.'
  },
  {
    name: 'smooth',
    type: 'boolean',
    default: 'true',
    description: 'When true, smoothens the animation of the letters for a more subtle feel.'
  }
];
</script>

<style scoped>
.demo-container {
  overflow: hidden;
  padding: 0;
}
</style>
