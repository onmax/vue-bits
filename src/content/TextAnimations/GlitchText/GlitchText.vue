<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface GlitchTextProps {
  text: string
  speed?: number
  enableShadows?: boolean
  enableOnHover?: boolean
  className?: string
}

const props = withDefaults(defineProps<GlitchTextProps>(), {
  text: '',
  speed: 1,
  enableShadows: true,
  enableOnHover: true,
  className: ''
})

const glitchRef = ref<HTMLSpanElement>()

const inlineStyles = computed(() => ({
  '--after-duration': `${props.speed * 3}s`,
  '--before-duration': `${props.speed * 2}s`,
  '--after-shadow': props.enableShadows ? '-5px 0 red' : 'none',
  '--before-shadow': props.enableShadows ? '5px 0 cyan' : 'none'
}))
</script>

<template>
  <div
    ref="glitchRef"
    class="text-white text-[clamp(2rem,10vw,8rem)] font-black relative mx-auto select-none cursor-pointer whitespace-nowrap after:absolute after:top-0 after:text-white after:bg-[#060010] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] before:absolute before:top-0 before:text-white before:bg-[#060010] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] after:left-[10px] before:left-[-10px]"
    :class="[className, {
      'after:content-[attr(data-text)] before:content-[attr(data-text)] after:[text-shadow:var(--after-shadow)] before:[text-shadow:var(--before-shadow)] glitch-active': !enableOnHover,
      'after:content-[\'\'] before:content-[\'\'] after:opacity-0 before:opacity-0 glitch-hover': enableOnHover,
    }]"
    :style="inlineStyles"
    :data-text="text"
  >
    {{ text }}
  </div>
</template>

<style scoped>
@keyframes glitch {
  0%   { clip-path: inset(20% 0 50% 0); }
  5%   { clip-path: inset(10% 0 60% 0); }
  10%  { clip-path: inset(15% 0 55% 0); }
  15%  { clip-path: inset(25% 0 35% 0); }
  20%  { clip-path: inset(30% 0 40% 0); }
  25%  { clip-path: inset(40% 0 20% 0); }
  30%  { clip-path: inset(10% 0 60% 0); }
  35%  { clip-path: inset(15% 0 55% 0); }
  40%  { clip-path: inset(25% 0 35% 0); }
  45%  { clip-path: inset(30% 0 40% 0); }
  50%  { clip-path: inset(20% 0 50% 0); }
  55%  { clip-path: inset(10% 0 60% 0); }
  60%  { clip-path: inset(15% 0 55% 0); }
  65%  { clip-path: inset(25% 0 35% 0); }
  70%  { clip-path: inset(30% 0 40% 0); }
  75%  { clip-path: inset(40% 0 20% 0); }
  80%  { clip-path: inset(20% 0 50% 0); }
  85%  { clip-path: inset(10% 0 60% 0); }
  90%  { clip-path: inset(15% 0 55% 0); }
  95%  { clip-path: inset(25% 0 35% 0); }
  100% { clip-path: inset(30% 0 40% 0); }
}

/* Always active glitch animation */
.glitch-active::after {
  animation: glitch var(--after-duration, 3s) infinite linear alternate-reverse;
}

.glitch-active::before {
  animation: glitch var(--before-duration, 2s) infinite linear alternate-reverse;
}

/* Hover-only glitch animation */
.glitch-hover:hover::after {
  content: attr(data-text) !important;
  opacity: 1 !important;
  text-shadow: var(--after-shadow) !important;
  animation: glitch var(--after-duration, 3s) infinite linear alternate-reverse;
}

.glitch-hover:hover::before {
  content: attr(data-text) !important;
  opacity: 1 !important;
  text-shadow: var(--before-shadow) !important;
  animation: glitch var(--before-duration, 2s) infinite linear alternate-reverse;
}
</style>
