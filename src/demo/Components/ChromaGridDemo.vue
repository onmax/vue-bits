<template>
  <TabbedLayout>
    <template #preview>
      <div class="demo-container relative overflow-hidden py-6">
        <ChromaGrid />
      </div>

      <PropTable :data="propData" />
      <Dependencies :dependency-list="['gsap']" />
    </template>

    <template #code>
      <CodeExample :code-object="chromaGrid" />
    </template>

    <template #cli>
      <CliInstallation :command="chromaGrid.cli" />
    </template>
  </TabbedLayout>
</template>

<script setup>
import CliInstallation from '../../components/code/CliInstallation.vue';
import CodeExample from '../../components/code/CodeExample.vue';
import Dependencies from '../../components/code/Dependencies.vue';
import PropTable from '../../components/common/PropTable.vue';
import TabbedLayout from '../../components/common/TabbedLayout.vue';


import { chromaGrid } from '../../constants/code/Components/chromaGridCode'
import ChromaGrid from '../../content/Components/ChromaGrid/ChromaGrid.vue'

const propData = [
  {
    name: 'items',
    type: 'Array',
    default: 'Demo []',
    description: 'Array of ChromaItem objects to display in the grid',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes to apply to the grid container',
  },
  {
    name: 'radius',
    type: 'number',
    default: '300',
    description: 'Size of the spotlight effect in pixels',
  },
  {
    name: 'damping',
    type: 'number',
    default: '0.45',
    description: 'Cursor follow animation duration in seconds',
  },
  {
    name: 'fadeOut',
    type: 'number',
    default: '0.6',
    description: 'Fade-out animation duration in seconds when mouse leaves',
  },
  {
    name: 'ease',
    type: 'string',
    default: "'power3.out'",
    description: 'GSAP easing function for animations',
  },
]
</script>

<style scoped>
.demo-container {
  height: auto;
}
</style>
