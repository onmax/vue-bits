<template>
  <TabbedLayout>
    <template #preview>
      <div class="relative p-0 h-[500px] overflow-hidden demo-container">
        <Orb
          :hue="debouncedHue"
          :hoverIntensity="debouncedHoverIntensity"
          :rotateOnHover="rotateOnHover"
          :forceHoverState="forceHoverState"
        />
        <p class="z-0 absolute mb-0 font-black text-[clamp(2rem,2vw,6rem)] mix-blend-difference">Hover.</p>
      </div>

      <Customize>
        <PreviewSlider
          title="Hue Shift"
          :min="0"
          :max="360"
          :step="1"
          v-model="hue"
          @onChange="
            (val: number) => {
              hue = val;
            }
          "
        />

        <PreviewSlider
          title="Hover Intensity"
          :min="0"
          :max="5"
          :step="0.01"
          v-model="hoverIntensity"
          @onChange="
            (val: number) => {
              hoverIntensity = val;
            }
          "
        />

        <PreviewSwitch title="Rotate on Hover" v-model="rotateOnHover" @update:model-value="forceRerender" />

        <PreviewSwitch title="Force Hover State" v-model="forceHoverState" @update:model-value="forceRerender" />
      </Customize>

      <PropTable :data="propData" />
      <Dependencies :dependency-list="['ogl']" />
    </template>

    <template #code>
      <CodeExample :code-object="orb" />
    </template>

    <template #cli>
      <CliInstallation :command="orb.cli" />
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
import { orb } from '../../constants/code/Backgrounds/orbCode';
import Orb from '../../content/Backgrounds/Orb/Orb.vue';

const { forceRerender } = useForceRerender();

const hue = ref(100);
const hoverIntensity = ref(0.5);
const rotateOnHover = ref(true);
const forceHoverState = ref(false);

const debouncedHue = ref(100);
const debouncedHoverIntensity = ref(0.5);

let hueTimeout: number;
let hoverIntensityTimeout: number;

watch(hue, newValue => {
  clearTimeout(hueTimeout);
  hueTimeout = setTimeout(() => {
    debouncedHue.value = newValue;
  }, 300);
});
watch(hoverIntensity, newValue => {
  clearTimeout(hoverIntensityTimeout);
  hoverIntensityTimeout = setTimeout(() => {
    debouncedHoverIntensity.value = newValue;
  }, 300);
});

const propData = [
  {
    name: 'hue',
    type: 'number',
    default: '100',
    description: 'The base hue for the orb (in degrees).'
  },
  {
    name: 'hoverIntensity',
    type: 'number',
    default: '0.2',
    description: 'Controls the intensity of the hover distortion effect.'
  },
  {
    name: 'rotateOnHover',
    type: 'boolean',
    default: 'true',
    description: 'Toggle to enable or disable continuous rotation on hover.'
  },
  {
    name: 'forceHoverState',
    type: 'boolean',
    default: 'false',
    description: 'Force hover animations even when the orb is not actually hovered.'
  }
];
</script>
