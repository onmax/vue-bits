<template>
  <div
    ref="elementRef"
    :class="[
      'relative overflow-hidden',
      className
    ]"
    :style="{
      '--metallic-color': color,
      '--metallic-intensity': intensity,
      '--metallic-speed': `${speed}s`
    }"
  >
    <div class="metallic-paint-bg" />
    <div class="metallic-paint-overlay" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  color?: string
  intensity?: number
  speed?: number
  className?: string
  autoPlay?: boolean
  trigger?: 'hover' | 'click' | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  color: '#c0c0c0',
  intensity: 0.8,
  speed: 2,
  className: '',
  autoPlay: true,
  trigger: 'auto'
})

const elementRef = ref<HTMLDivElement | null>(null)

const triggerAnimation = () => {
  if (!elementRef.value) return

  elementRef.value.classList.add('animate-metallic')
  
  setTimeout(() => {
    if (elementRef.value) {
      elementRef.value.classList.remove('animate-metallic')
    }
  }, props.speed * 1000)
}

onMounted(() => {
  if (!elementRef.value) return

  if (props.autoPlay && props.trigger === 'auto') {
    triggerAnimation()
  }

  if (props.trigger === 'hover') {
    elementRef.value.addEventListener('mouseenter', triggerAnimation)
  }

  if (props.trigger === 'click') {
    elementRef.value.addEventListener('click', triggerAnimation)
  }
})

onUnmounted(() => {
  if (elementRef.value) {
    elementRef.value.removeEventListener('mouseenter', triggerAnimation)
    elementRef.value.removeEventListener('click', triggerAnimation)
  }
})

defineExpose({
  trigger: triggerAnimation
})
</script>

<style scoped>
.metallic-paint-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent,
    var(--metallic-color, #c0c0c0),
    transparent
  );
  opacity: 0;
  transform: translateX(-100%);
  transition: all var(--metallic-speed, 2s) ease-in-out;
}

.metallic-paint-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, var(--metallic-intensity, 0.8)),
    transparent
  );
  opacity: 0;
  transform: translateX(-100%);
  transition: all var(--metallic-speed, 2s) ease-in-out;
}

.animate-metallic .metallic-paint-bg {
  opacity: 0.6;
  transform: translateX(100%);
}

.animate-metallic .metallic-paint-overlay {
  opacity: 1;
  transform: translateX(100%);
}

.animate-metallic {
  position: relative;
  overflow: hidden;
}

.animate-metallic::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transform: translateX(-100%);
  animation: metallic-shine var(--metallic-speed, 2s) ease-in-out;
}

@keyframes metallic-shine {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>