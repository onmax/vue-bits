<template>
  <div class="lightning-demo">
    <TabbedLayout>
      <template #preview>
        <div class="demo-container">
          <Lightning
            :hue="hue"
            :x-offset="xOffset"
            :speed="speed"
            :intensity="intensity"
            :size="size"
            class="w-full h-full"
          />
        </div>

        <Customize>
          <PreviewSlider title="Hue" v-model="hue" :min="0" :max="360" :step="1" />

          <PreviewSlider title="X Offset" v-model="xOffset" :min="-2" :max="2" :step="0.1" />

          <PreviewSlider title="Speed" v-model="speed" :min="0.5" :max="2" :step="0.1" />

          <PreviewSlider title="Intensity" v-model="intensity" :min="0.1" :max="2" :step="0.1" />

          <PreviewSlider title="Size" v-model="size" :min="0.1" :max="3" :step="0.1" />
        </Customize>

        <PropTable :data="propData" />

        <Dependencies :dependency-list="[]" />
      </template>

      <template #code>
        <CodeExample :code-object="lightning" />
      </template>

      <template #cli>
        <CliInstallation :command="lightning.cli" />
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
import Lightning from '@/content/Backgrounds/Lightning/Lightning.vue';
import PreviewSlider from '@/components/common/PreviewSlider.vue';
import { lightning } from '@/constants/code/Backgrounds/lightningCode';

const hue = ref(160);
const xOffset = ref(0);
const speed = ref(1);
const intensity = ref(1);
const size = ref(1);

const propData = [
  { name: 'hue', type: 'number', default: '230', description: 'Hue of the lightning in degrees (0 to 360).' },
  {
    name: 'xOffset',
    type: 'number',
    default: '0',
    description: 'Horizontal offset of the lightning in normalized units.'
  },
  { name: 'speed', type: 'number', default: '1', description: 'Animation speed multiplier for the lightning.' },
  { name: 'intensity', type: 'number', default: '1', description: 'Brightness multiplier for the lightning.' },
  { name: 'size', type: 'number', default: '1', description: 'Scale factor for the bolt size.' }
];
</script>

<style scoped>
.demo-container {
  overflow: hidden;
  padding: 0;
}
</style>
