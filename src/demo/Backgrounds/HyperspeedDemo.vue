<template>
  <div class="hyperspeed-demo">
    <TabbedLayout>
      <template #preview>
        <div class="demo-container">
          <div class="instruction-text">Click & Hold</div>
          <Hyperspeed :effect-options="currentPreset" />
        </div>

        <Customize>
          <PreviewSelect title="Animation Preset" :options="options" v-model="activePreset" />
        </Customize>

        <PropTable :data="propData" />

        <Dependencies :dependency-list="['three', 'postprocessing']" />
      </template>

      <template #code>
        <CodeExample :code-object="hyperspeed" />
      </template>

      <template #cli>
        <CliInstallation :command="hyperspeed.cli" />
      </template>
    </TabbedLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TabbedLayout from '../../components/common/TabbedLayout.vue';
import PropTable from '../../components/common/PropTable.vue';
import Dependencies from '../../components/code/Dependencies.vue';
import CliInstallation from '../../components/code/CliInstallation.vue';
import CodeExample from '../../components/code/CodeExample.vue';
import Customize from '../../components/common/Customize.vue';
import PreviewSelect from '../../components/common/PreviewSelect.vue';
import Hyperspeed from '../../content/Backgrounds/Hyperspeed/Hyperspeed.vue';
import { hyperspeedPresets } from '../../content/Backgrounds/Hyperspeed/HyperspeedPresets';
import { hyperspeed } from '@/constants/code/Backgrounds/hyperspeedCode';

const activePreset = ref<string>('one');

const currentPreset = computed(() => {
  return hyperspeedPresets[activePreset.value as keyof typeof hyperspeedPresets];
});

const propData = [
  {
    name: 'effectOptions',
    type: 'object',
    default: 'See the "code" tab for default values and presets.',
    description:
      'The highly customizable configuration object for the effect, controls things like colors, distortion, line properties, etc.'
  }
];

const options = [
  { value: 'one', label: 'Cyberpunk' },
  { value: 'two', label: 'Akira' },
  { value: 'three', label: 'Golden' },
  { value: 'four', label: 'Split' },
  { value: 'five', label: 'Highway' },
  { value: 'six', label: 'Deep' }
];
</script>

<style scoped>
.hyperspeed-demo {
  width: 100%;
}

.demo-container {
  height: 600px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
}

.instruction-text {
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 900;
  font-size: 4rem;
  color: #222;
  z-index: 10;
  pointer-events: none;
}
</style>
