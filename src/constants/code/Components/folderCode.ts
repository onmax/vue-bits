import code from '@content/Components/Folder/Folder.vue?raw';
import type { CodeObject } from '../../../types/code';

export const folder: CodeObject = {
  cli: `npx jsrepo add https://vue-bits.dev/ui/Components/Folder`,
  usage: `<template>
  <Folder :items="items" :size="2" color="#5227FF" class="my-folder-class" />
</template>

<script setup lang="ts">
  import Folder from "./Folder.vue";

  const items = ['Doc 1', 'Doc 2', 'Doc 3'];
</script>`,
  code
};
