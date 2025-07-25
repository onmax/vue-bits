<template>
  <TabbedLayout>
    <template #preview>
      <div class="h-[600px] overflow-hidden demo-container relative">
        <LightRays
          :rays-origin="raysOrigin"
          :rays-color="raysColor"
          :rays-speed="raysSpeed"
          :light-spread="lightSpread"
          :ray-length="rayLength"
          :pulsating="pulsating"
          :fade-distance="fadeDistance"
          :saturation="saturation"
          :follow-mouse="true"
          :mouse-influence="mouseInfluence"
          :noise-amount="noiseAmount"
          :distortion="distortion"
          class="w-full h-full"
        />

        <BackgroundContent pill-text="New Background" headline="May these lights guide you on your path" />
      </div>

      <Customize>
        <PreviewColor
          title="Rays Color"
          v-model="raysColor"
        />

        <PreviewSelect
          title="Rays Origin"
          v-model="raysOrigin"
          :options="raysOriginOptions"
        />

        <PreviewSlider
          title="Rays Speed"
          v-model="raysSpeed"
          :min="0.1"
          :max="3"
          :step="0.1"
        />

        <PreviewSlider
          title="Light Spread"
          v-model="lightSpread"
          :min="0.1"
          :max="2"
          :step="0.1"
        />

        <PreviewSlider
          title="Ray Length"
          v-model="rayLength"
          :min="0.5"
          :max="3"
          :step="0.1"
        />

        <PreviewSlider
          title="Fade Distance"
          v-model="fadeDistance"
          :min="0.5"
          :max="2"
          :step="0.1"
        />

        <PreviewSlider
          title="Saturation"
          v-model="saturation"
          :min="0"
          :max="2"
          :step="0.1"
        />

        <PreviewSlider
          title="Mouse Influence"
          v-model="mouseInfluence"
          :min="0"
          :max="1"
          :step="0.1"
        />

        <PreviewSlider
          title="Noise Amount"
          v-model="noiseAmount"
          :min="0"
          :max="0.5"
          :step="0.01"
        />

        <PreviewSlider
          title="Distortion"
          v-model="distortion"
          :min="0"
          :max="1"
          :step="0.1"
        />

        <PreviewSwitch title="Pulsating" v-model="pulsating" />
      </Customize>

      <PropTable :data="propData" />
      <Dependencies :dependency-list="['ogl']" />
    </template>

    <template #code>
      <CodeExample :code-object="lightRays" />
    </template>

    <template #cli>
      <CliInstallation :command="lightRays.cli" />
    </template>
  </TabbedLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabbedLayout from '@/components/common/TabbedLayout.vue';
import PropTable from '@/components/common/PropTable.vue';
import Dependencies from '@/components/code/Dependencies.vue';
import CliInstallation from '@/components/code/CliInstallation.vue';
import CodeExample from '@/components/code/CodeExample.vue';
import Customize from '@/components/common/Customize.vue';
import PreviewSwitch from '@/components/common/PreviewSwitch.vue';
import PreviewSlider from '@/components/common/PreviewSlider.vue';
import PreviewSelect from '@/components/common/PreviewSelect.vue';
import PreviewColor from '@/components/common/PreviewColor.vue';
import BackgroundContent from '@/components/common/BackgroundContent.vue';
import LightRays, { type RaysOrigin } from '../../content/Backgrounds/LightRays/LightRays.vue';
import { lightRays } from '@/constants/code/Backgrounds/lightRaysCode';

const raysOrigin = ref<RaysOrigin>('top-center');
const raysColor = ref('#ffffff');
const raysSpeed = ref(1);
const lightSpread = ref(0.5);
const rayLength = ref(3.0);
const pulsating = ref(false);
const fadeDistance = ref(1.0);
const saturation = ref(1.0);
const mouseInfluence = ref(0.1);
const noiseAmount = ref(0.0);
const distortion = ref(0.0);

const raysOriginOptions = [
  { value: 'top-center', label: 'Top' },
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
  { value: 'bottom-center', label: 'Bottom' },
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' }
];

const propData = [
  {
    name: 'raysOrigin',
    type: 'RaysOrigin',
    default: '"top-center"',
    description:
      "Origin position of the light rays. Options: 'top-center', 'top-left', 'top-right', 'right', 'left', 'bottom-center', 'bottom-right', 'bottom-left'"
  },
  {
    name: 'raysColor',
    type: 'string',
    default: '"#ffffff"',
    description: 'Color of the light rays in hex format'
  },
  {
    name: 'raysSpeed',
    type: 'number',
    default: '1',
    description: 'Animation speed of the rays'
  },
  {
    name: 'lightSpread',
    type: 'number',
    default: '0.5',
    description: 'Controls how wide the light rays spread'
  },
  {
    name: 'rayLength',
    type: 'number',
    default: '3.0',
    description: 'Length of the light rays'
  },
  {
    name: 'pulsating',
    type: 'boolean',
    default: 'false',
    description: 'Whether the rays should pulsate'
  },
  {
    name: 'fadeDistance',
    type: 'number',
    default: '1.0',
    description: 'Distance at which the rays fade out'
  },
  {
    name: 'saturation',
    type: 'number',
    default: '1.0',
    description: 'Color saturation of the rays'
  },
  {
    name: 'followMouse',
    type: 'boolean',
    default: 'false',
    description: 'Whether the rays should follow the mouse cursor'
  },
  {
    name: 'mouseInfluence',
    type: 'number',
    default: '0.1',
    description: 'How much the mouse movement affects the rays'
  },
  {
    name: 'noiseAmount',
    type: 'number',
    default: '0.0',
    description: 'Amount of noise/distortion in the rays'
  },
  {
    name: 'distortion',
    type: 'number',
    default: '0.0',
    description: 'Amount of wave distortion in the rays'
  }
];
</script>
