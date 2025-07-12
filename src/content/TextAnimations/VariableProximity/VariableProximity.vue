<template>
  <div
    ref="containerRef"
    :class="`variable-proximity-container ${className}`"
    :style="{
      textAlign,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    }"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <span
      v-for="(char, index) in splitText"
      :key="index"
      ref="charRefs"
      :class="`variable-proximity-char inline-block transition-all duration-300 ease-out`"
      :style="{
        opacity: charOpacities[index] || minOpacity,
        transform: `scale(${charScales[index] || 1}) translateY(${charTranslateY[index] || 0}px)`,
        color: charColors[index] || 'inherit',
        fontSize: `${charFontSizes[index] || 1}em`,
        fontWeight: charFontWeights[index] || 'inherit',
        textShadow: charTextShadows[index] || 'none',
        willChange: 'transform, opacity, color, font-size, font-weight, text-shadow',
      }"
    >
      {{ char === ' ' ? '\u00A0' : char }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

export interface VariableProximityProps {
  text: string
  className?: string
  radius?: number
  maxScale?: number
  minScale?: number
  maxOpacity?: number
  minOpacity?: number
  maxFontSize?: number
  minFontSize?: number
  maxTranslateY?: number
  minTranslateY?: number
  colorIntensity?: number
  shadowIntensity?: number
  easing?: string
  duration?: number
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  animationType?: 'scale' | 'opacity' | 'fontSize' | 'color' | 'shadow' | 'translateY' | 'all'
  interactive?: boolean
  highlightColor?: string
  shadowColor?: string
}

const props = withDefaults(defineProps<VariableProximityProps>(), {
  className: '',
  radius: 100,
  maxScale: 1.5,
  minScale: 1,
  maxOpacity: 1,
  minOpacity: 0.3,
  maxFontSize: 1.2,
  minFontSize: 1,
  maxTranslateY: -10,
  minTranslateY: 0,
  colorIntensity: 0.8,
  shadowIntensity: 0.8,
  easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
  duration: 300,
  textAlign: 'center',
  animationType: 'all',
  interactive: true,
  highlightColor: '#27FF64',
  shadowColor: '#27FF64'
})

const emit = defineEmits<{
  'proximity-change': [proximityData: { index: number; distance: number; intensity: number }]
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const charRefs = ref<HTMLSpanElement[]>([])
const mousePosition = ref({ x: 0, y: 0 })
const isMouseInside = ref(false)

const splitText = computed(() => props.text.split(''))

const charOpacities = ref<number[]>([])
const charScales = ref<number[]>([])
const charTranslateY = ref<number[]>([])
const charColors = ref<string[]>([])
const charFontSizes = ref<number[]>([])
const charFontWeights = ref<string[]>([])
const charTextShadows = ref<string[]>([])

const initializeArrays = () => {
  const length = splitText.value.length
  charOpacities.value = new Array(length).fill(props.minOpacity)
  charScales.value = new Array(length).fill(props.minScale)
  charTranslateY.value = new Array(length).fill(props.minTranslateY)
  charColors.value = new Array(length).fill('inherit')
  charFontSizes.value = new Array(length).fill(props.minFontSize)
  charFontWeights.value = new Array(length).fill('inherit')
  charTextShadows.value = new Array(length).fill('none')
}

const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

const calculateIntensity = (distance: number, radius: number): number => {
  if (distance >= radius) return 0
  return Math.pow(1 - distance / radius, 2)
}

const interpolate = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor
}

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const updateProximityEffects = () => {
  if (!containerRef.value || !props.interactive) return

  const containerRect = containerRef.value.getBoundingClientRect()
  
  charRefs.value.forEach((charEl, index) => {
    if (!charEl) return

    const charRect = charEl.getBoundingClientRect()
    const charCenterX = charRect.left + charRect.width / 2
    const charCenterY = charRect.top + charRect.height / 2

    const distance = calculateDistance(
      mousePosition.value.x,
      mousePosition.value.y,
      charCenterX,
      charCenterY
    )

    const intensity = calculateIntensity(distance, props.radius)

    if (intensity > 0) {
      emit('proximity-change', { index, distance, intensity })
    }

    if (props.animationType === 'all' || props.animationType === 'opacity') {
      charOpacities.value[index] = isMouseInside.value
        ? interpolate(props.minOpacity, props.maxOpacity, intensity)
        : props.minOpacity
    }

    if (props.animationType === 'all' || props.animationType === 'scale') {
      charScales.value[index] = isMouseInside.value
        ? interpolate(props.minScale, props.maxScale, intensity)
        : props.minScale
    }

    if (props.animationType === 'all' || props.animationType === 'translateY') {
      charTranslateY.value[index] = isMouseInside.value
        ? interpolate(props.minTranslateY, props.maxTranslateY, intensity)
        : props.minTranslateY
    }

    if (props.animationType === 'all' || props.animationType === 'fontSize') {
      charFontSizes.value[index] = isMouseInside.value
        ? interpolate(props.minFontSize, props.maxFontSize, intensity)
        : props.minFontSize
    }

    if (props.animationType === 'all' || props.animationType === 'color') {
      const color = hexToRgb(props.highlightColor)
      if (color && intensity > 0 && isMouseInside.value) {
        const alpha = intensity * props.colorIntensity
        charColors.value[index] = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
      } else {
        charColors.value[index] = 'inherit'
      }
    }

    if (props.animationType === 'all' || props.animationType === 'shadow') {
      const shadowColor = hexToRgb(props.shadowColor)
      if (shadowColor && intensity > 0 && isMouseInside.value) {
        const alpha = intensity * props.shadowIntensity
        const shadowSize = Math.round(intensity * 10)
        charTextShadows.value[index] = `0 0 ${shadowSize}px rgba(${shadowColor.r}, ${shadowColor.g}, ${shadowColor.b}, ${alpha})`
      } else {
        charTextShadows.value[index] = 'none'
      }
    }
  })
}

const handleMouseMove = (event: MouseEvent) => {
  if (!props.interactive) return

  mousePosition.value = {
    x: event.clientX,
    y: event.clientY
  }
  isMouseInside.value = true
  updateProximityEffects()
}

const handleMouseLeave = () => {
  if (!props.interactive) return

  isMouseInside.value = false
  updateProximityEffects()
}

onMounted(async () => {
  await nextTick()
  initializeArrays()
  
  if (!props.interactive) {
    charOpacities.value = new Array(splitText.value.length).fill(props.maxOpacity)
    charScales.value = new Array(splitText.value.length).fill(props.maxScale)
    charFontSizes.value = new Array(splitText.value.length).fill(props.maxFontSize)
  }
})

onUnmounted(() => {
  // Cleanup if needed
})

watch(
  [
    () => props.text,
    () => props.radius,
    () => props.maxScale,
    () => props.minScale,
    () => props.maxOpacity,
    () => props.minOpacity,
    () => props.interactive,
  ],
  () => {
    initializeArrays()
  }
)
</script>

<style scoped>
.variable-proximity-container {
  display: inline-block;
  position: relative;
}

.variable-proximity-char {
  display: inline-block;
  position: relative;
  transition-property: opacity, transform, color, font-size, font-weight, text-shadow;
  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  transition-duration: 300ms;
  will-change: transform, opacity, color, font-size, font-weight, text-shadow;
}

.variable-proximity-char:hover {
  z-index: 1;
}
</style>