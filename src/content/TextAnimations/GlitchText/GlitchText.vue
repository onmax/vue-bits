<template>
  <div :class="computedClasses" :style="inlineStyles" :data-text="children">
    {{ children }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import './GlitchText.css';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

const props = withDefaults(defineProps<GlitchTextProps>(), {
  speed: 0.5,
  enableShadows: true,
  enableOnHover: false,
  className: ''
});

const inlineStyles = computed(
  (): CustomCSSProperties => ({
    '--after-duration': `${props.speed * 3}s`,
    '--before-duration': `${props.speed * 2}s`,
    '--after-shadow': props.enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': props.enableShadows ? '5px 0 cyan' : 'none'
  })
);

const computedClasses = computed(() => {
  const hoverClass = props.enableOnHover ? 'enable-on-hover' : '';
  return `glitch ${hoverClass} ${props.className}`.trim();
});
</script>
