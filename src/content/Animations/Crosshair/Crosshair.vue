<template>
  <div
    :class="[
      'crosshair',
      `crosshair--${variant}`,
      {
        'crosshair--hidden': !isVisible,
        'crosshair--hovering': isHovering
      }
    ]"
    :style="crosshairStyle"
  >
    <div class="crosshair__inner"></div>
    <div class="crosshair__outer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

interface CrosshairProps {
  variant?: 'default' | 'dot' | 'crosshair' | 'ring'
  size?: number
  strokeWidth?: number
  color?: string
  opacity?: number
  smoothness?: number
  hoverScale?: number
  hoverTargets?: string[]
  hideOnLeave?: boolean
  blendMode?: string
}

const props = withDefaults(defineProps<CrosshairProps>(), {
  variant: 'default',
  size: 40,
  strokeWidth: 2,
  color: '#000000',
  opacity: 0.8,
  smoothness: 0.15,
  hoverScale: 1.5,
  hoverTargets: () => ['a', 'button', '[role="button"]'],
  hideOnLeave: true,
  blendMode: 'difference'
})

const mouseX = ref(0)
const mouseY = ref(0)
const currentX = ref(0)
const currentY = ref(0)
const isVisible = ref(false)
const isHovering = ref(false)
const animationId = ref<number>()

const crosshairStyle = computed(() => ({
  '--crosshair-x': `${currentX.value}px`,
  '--crosshair-y': `${currentY.value}px`,
  '--crosshair-size': `${props.size}px`,
  '--crosshair-stroke-width': `${props.strokeWidth}px`,
  '--crosshair-color': props.color,
  '--crosshair-opacity': props.opacity,
  '--crosshair-scale': isHovering.value ? props.hoverScale : 1,
  '--crosshair-blend-mode': props.blendMode
}))

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

const animate = () => {
  currentX.value = lerp(currentX.value, mouseX.value, props.smoothness)
  currentY.value = lerp(currentY.value, mouseY.value, props.smoothness)
  
  animationId.value = requestAnimationFrame(animate)
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  
  if (!isVisible.value) {
    isVisible.value = true
    currentX.value = e.clientX
    currentY.value = e.clientY
  }
}

const handleMouseEnter = () => {
  if (props.hideOnLeave) {
    isVisible.value = true
  }
}

const handleMouseLeave = () => {
  if (props.hideOnLeave) {
    isVisible.value = false
  }
}

const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const isHoverTarget = props.hoverTargets.some(selector => {
    if (selector.startsWith('[') && selector.endsWith(']')) {
      const attr = selector.slice(1, -1).split('=')[0]
      return target.hasAttribute(attr)
    }
    return target.matches(selector)
  })
  
  isHovering.value = isHoverTarget
}

onMounted(() => {
  nextTick(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)
    
    animate()
  })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('mouseover', handleMouseOver)
  
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})
</script>

<style scoped>
.crosshair {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--crosshair-size);
  height: var(--crosshair-size);
  pointer-events: none;
  z-index: 9999;
  transform: translate3d(
    calc(var(--crosshair-x) - var(--crosshair-size) / 2),
    calc(var(--crosshair-y) - var(--crosshair-size) / 2),
    0
  ) scale(var(--crosshair-scale));
  opacity: var(--crosshair-opacity);
  transition: opacity 0.3s ease, transform 0.2s ease;
  mix-blend-mode: var(--crosshair-blend-mode);
}

.crosshair--hidden {
  opacity: 0;
}

.crosshair__inner,
.crosshair__outer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.crosshair--default .crosshair__outer {
  width: 100%;
  height: 100%;
  border: var(--crosshair-stroke-width) solid var(--crosshair-color);
  border-radius: 50%;
}

.crosshair--default .crosshair__inner {
  width: 4px;
  height: 4px;
  background: var(--crosshair-color);
  border-radius: 50%;
}

.crosshair--dot .crosshair__inner {
  width: 8px;
  height: 8px;
  background: var(--crosshair-color);
  border-radius: 50%;
}

.crosshair--crosshair .crosshair__inner {
  width: 2px;
  height: 100%;
  background: var(--crosshair-color);
}

.crosshair--crosshair .crosshair__outer {
  width: 100%;
  height: 2px;
  background: var(--crosshair-color);
}

.crosshair--ring .crosshair__outer {
  width: 100%;
  height: 100%;
  border: var(--crosshair-stroke-width) solid var(--crosshair-color);
  border-radius: 50%;
}

.crosshair--hovering {
  transform: translate3d(
    calc(var(--crosshair-x) - var(--crosshair-size) / 2),
    calc(var(--crosshair-y) - var(--crosshair-size) / 2),
    0
  ) scale(var(--crosshair-scale));
}

@media (hover: none) {
  .crosshair {
    display: none;
  }
}
</style>