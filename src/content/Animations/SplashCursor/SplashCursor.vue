<template>
  <div 
    ref="containerRef"
    class="relative w-full h-full"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-for="(dot, index) in dots"
      :key="index"
      class="absolute pointer-events-none rounded-full transition-all duration-300"
      :style="{
        left: `${dot.x}px`,
        top: `${dot.y}px`,
        width: `${dot.size}px`,
        height: `${dot.size}px`,
        backgroundColor: trailColor,
        opacity: dot.opacity,
        transform: `translate(-50%, -50%) scale(${dot.scale})`,
        transitionDelay: `${index * delayBetweenDots}ms`,
        zIndex: 9999 - index
      }"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Dot {
  x: number
  y: number
  size: number
  opacity: number
  scale: number
  targetX: number
  targetY: number
}

interface Props {
  trailColor?: string
  trailLength?: number
  dotSize?: number
  animationSpeed?: number
  fadeSpeed?: number
  scaleVariation?: number
  delayBetweenDots?: number
  smoothness?: number
}

const props = withDefaults(defineProps<Props>(), {
  trailColor: '#ffffff',
  trailLength: 12,
  dotSize: 8,
  animationSpeed: 0.15,
  fadeSpeed: 0.02,
  scaleVariation: 0.8,
  delayBetweenDots: 50,
  smoothness: 0.1
})

const containerRef = ref<HTMLDivElement | null>(null)
const dots = ref<Dot[]>([])
const mouseX = ref(0)
const mouseY = ref(0)
const isMouseInside = ref(false)
const animationId = ref<number | null>(null)

// Initialize dots
const initializeDots = () => {
  dots.value = Array.from({ length: props.trailLength }, (_, i) => ({
    x: 0,
    y: 0,
    size: props.dotSize * (1 - (i / props.trailLength) * props.scaleVariation),
    opacity: 1 - (i / props.trailLength) * 0.8,
    scale: 1 - (i / props.trailLength) * 0.3,
    targetX: 0,
    targetY: 0
  }))
}

const handleMouseMove = (e: MouseEvent) => {
  if (!containerRef.value) return
  
  const rect = containerRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
  isMouseInside.value = true
}

const handleMouseLeave = () => {
  isMouseInside.value = false
}

const updateDots = () => {
  if (!isMouseInside.value) {
    // Fade out dots when mouse leaves
    dots.value.forEach(dot => {
      dot.opacity = Math.max(0, dot.opacity - props.fadeSpeed)
    })
  } else {
    // Update dot positions with smooth trailing
    dots.value.forEach((dot, index) => {
      if (index === 0) {
        // First dot follows mouse directly
        dot.targetX = mouseX.value
        dot.targetY = mouseY.value
        dot.opacity = 1
      } else {
        // Following dots trail behind the previous dot
        const prevDot = dots.value[index - 1]
        dot.targetX = prevDot.x
        dot.targetY = prevDot.y
        dot.opacity = 1 - (index / props.trailLength) * 0.8
      }
      
      // Smooth interpolation for natural movement
      dot.x += (dot.targetX - dot.x) * props.animationSpeed
      dot.y += (dot.targetY - dot.y) * props.animationSpeed
    })
  }
}

const animate = () => {
  updateDots()
  animationId.value = requestAnimationFrame(animate)
}

onMounted(() => {
  initializeDots()
  animationId.value = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})

// Computed property for optimized color rendering
const trailColor = computed(() => props.trailColor)
const delayBetweenDots = computed(() => props.delayBetweenDots)
</script>

<style scoped>
/* Hide default cursor when mouse is over the component */
div {
  cursor: none;
}

/* Smooth transitions for dots */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>