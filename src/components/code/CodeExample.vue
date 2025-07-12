<template>
  <div class="code-example">
    <div v-for="[name, snippet] in codeEntries" :key="name" class="code-section">
      <h2 class="demo-title">{{ getDisplayName(name) }}</h2>

      <div v-if="snippet" class="code-container">
        <div class="code-wrapper" :class="{ collapsed: shouldCollapse(snippet) && !isExpanded(name) }">
          <VCodeBlock
            :code="snippet"
            highlightjs
            :lang="getLanguage(name)"
            theme="nord"
            :copy-button="true"
            :persistent-copy-button="true"
            class="code-block"
          />

          <div v-if="shouldCollapse(snippet) && !isExpanded(name)" class="fade-overlay" />

          <button
            v-if="shouldCollapse(snippet)"
            class="expand-button"
            :class="{ expanded: isExpanded(name) }"
            @click="toggleExpanded(name)"
          >
            {{ isExpanded(name) ? 'Collapse Snippet' : 'See Full Snippet' }}
          </button>
        </div>
      </div>

      <div v-if="!snippet" class="no-code">
        <span>Nothing here yet!</span>

        <i class="pi pi-face-sad"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { VCodeBlock } from '@wdns/vue-code-block';
import type { CodeObject } from '../../types/code';

const props = defineProps<{
  codeObject: CodeObject;
}>();

const skipKeys = ['cli'];

const expandedSections = ref<Set<string>>(new Set());

const codeEntries = computed(() => {
  return Object.entries(props.codeObject).filter(([name]) => !skipKeys.includes(name));
});

const shouldCollapse = (snippet: string) => {
  const codeLines = snippet?.split('\n').length || 0;
  return codeLines > 35;
};

const isExpanded = (name: string) => {
  return expandedSections.value.has(name);
};

const toggleExpanded = (name: string) => {
  if (expandedSections.value.has(name)) {
    expandedSections.value.delete(name);
  } else {
    expandedSections.value.add(name);
  }
};

const getDisplayName = (name: string) => {
  if (name === 'code') return 'Code';
  if (name === 'cli') return 'CLI Command';
  if (name === 'utility') return 'Utility';
  if (name === 'usage') return 'Usage';
  if (name === 'installation') return 'Installation';
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const getLanguage = (name: string) => {
  if (name === 'cli') return 'bash';
  if (name === 'code') return 'html';
  if (name === 'usage') return 'html';
  if (name === 'installation') return 'bash';
  return 'javascript';
};
</script>

<style scoped>
.code-example {
  margin: 1.2rem 0;
}

.code-section {
  margin-bottom: 2rem;
}

.code-container {
  position: relative;
  margin-bottom: 1.2rem;
}

.code-wrapper {
  position: relative;
  overflow: hidden;
  border: 1px solid #142216;
  border-radius: 15px;
}

.code-wrapper.collapsed {
  max-height: 600px;
}

.code-block {
  overflow: hidden;
  border: none;
  border-radius: 15px;
}

.fade-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to bottom, transparent, #0b0b0b);
  pointer-events: none;
  z-index: 1;
}

.expand-button {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  height: 2.5rem;
  font-size: 14px;
  font-weight: 500;
  background-color: #0b0b0b;
  border: 1px solid #142216;
  color: white;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.3s ease;
}

.expand-button:hover {
  background-color: #111;
}

.expand-button:active {
  background-color: #111;
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
  border-radius: 15px;
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
