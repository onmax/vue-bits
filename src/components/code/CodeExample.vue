<template>
  <div class="code-example">
    <div v-for="[name, snippet] in codeEntries" :key="name" class="code-section">
      <h2 v-if="shouldShowTitle()" class="demo-title">{{ getDisplayName(name) }}</h2>

      <VCodeBlock v-if="snippet" :code="snippet" highlightjs :lang="getLanguage(name)" theme="nord"
        :copy-button="true" :persistent-copy-button="true" class="code-block" />

      <div v-if="!snippet" class="no-code">
        <span>Nothing here yet!</span>
        <i class="pi pi-face-sad"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VCodeBlock } from '@wdns/vue-code-block'
import type { CodeObject } from '../../types/code'

const props = defineProps<{
  codeObject: CodeObject
}>()

const skipKeys = [
  'cli'
]

const codeEntries = computed(() => {
  return Object.entries(props.codeObject).filter(([name]) => !skipKeys.includes(name))
})

const shouldShowTitle = () => {
  return true // Show titles for all sections
}

const getDisplayName = (name: string) => {
  if (name === 'code') return 'Code'
  if (name === 'cli') return 'CLI Command'
  if (name === 'utility') return 'Utility'
  if (name === 'usage') return 'Usage'
  if (name === 'installation') return 'Installation'
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const getLanguage = (name: string) => {
  if (name === 'cli') return 'bash'
  if (name === 'code') return 'html'
  if (name === 'usage') return 'html'
  if (name === 'installation') return 'bash'
  return 'javascript'
}
</script>

<style scoped>
.code-example {
  margin: 1.2rem 0;
}

.code-section {
  margin-bottom: 2rem;
}

.code-block {
  overflow: hidden;
  border: 1px solid #142216;
  border-radius: 15px;
}

.no-code {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a1a1aa;
  font-style: italic;
  padding: 2rem;
  background: #0b0b0b;
  border: 1px solid #142216;
  border-radius: 15px;
}

:deep(.v-code-block) {
  background: #0b0b0b;
  border-radius: 10px;
  font-size: 14px;
}

:deep(.v-code-block pre) {
  background: #0b0b0b;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
}

:deep(.v-code-block--tab-highlightjs-github-dark-icon) {
  color: #999 !important;
  fill: #999 !important;
}

:deep(.v-code-block--me-1) {
  margin-right: 0 !important;
}

:deep(.v-code-block .hljs) {
  background: #0b0b0b;
  color: #fff;
  font-size: 14px;
}
</style>
