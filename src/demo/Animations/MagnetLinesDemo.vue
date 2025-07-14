<template>
  <TabbedLayout>
    <template #preview>
      <div class="demo-container">
        <MagnetLines :rows="10" :columns="12" container-size="40vmin" line-width="2px" line-height="30px" />
      </div>

      <PropTable :data="propData" />
    </template>

    <template #code>
      <CodeExample :code-object="magnetLines" />
    </template>

    <template #cli>
      <CliInstallation :command="magnetLines.cli" />
    </template>
  </TabbedLayout>
</template>

<script setup lang="ts">
import TabbedLayout from '../../components/common/TabbedLayout.vue';
import PropTable from '../../components/common/PropTable.vue';
import CliInstallation from '../../components/code/CliInstallation.vue';
import CodeExample from '../../components/code/CodeExample.vue';
import MagnetLines from '../../content/Animations/MagnetLines/MagnetLines.vue';
import { magnetLines } from '@/constants/code/Animations/magnetLinesCode';

const propData = [
  {
    name: 'rows',
    type: 'number',
    default: '9',
    description: 'Number of grid rows.'
  },
  {
    name: 'columns',
    type: 'number',
    default: '9',
    description: 'Number of grid columns.'
  },
  {
    name: 'containerSize',
    type: 'string',
    default: '80vmin',
    description: 'Specifies the width and height of the entire grid container.'
  },
  {
    name: 'lineColor',
    type: 'string',
    default: '#efefef',
    description: 'Color for each line (the <span> elements).'
  },
  {
    name: 'lineWidth',
    type: 'string',
    default: '1vmin',
    description: "Specifies each line's thickness."
  },
  {
    name: 'lineHeight',
    type: 'string',
    default: '6vmin',
    description: "Specifies each line's length."
  },
  {
    name: 'baseAngle',
    type: 'number',
    default: '-10',
    description: 'Initial rotation angle (in degrees) before pointer movement.'
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Additional class name(s) applied to the container.'
  },
  {
    name: 'style',
    type: 'object',
    default: '{}',
    description: 'Inline styles for the container.'
  }
];
</script>
