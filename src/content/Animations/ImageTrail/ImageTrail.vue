<template>
  <div
    ref="containerRef"
    class="image-trail-container"
    :class="className"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Trail images will be dynamically created here -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  images: string[]
  maxTrailLength?: number
  trailSpacing?: number
  fadeOutDuration?: number
  scaleEffect?: boolean
  rotationEffect?: boolean
  disabled?: boolean
  className?: string
  imageSize?: number
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxTrailLength: 8,
  trailSpacing: 40,
  fadeOutDuration: 1000,
  scaleEffect: true,
  rotationEffect: false,
  disabled: false,
  className: '',
  imageSize: 60,
  zIndex: 1000
})

const containerRef = ref<HTMLElement | null>(null)
const trailImages = ref<HTMLImageElement[]>([])
const currentImageIndex = ref(0)
const isMouseInside = ref(false)
let animationId: number | null = null

// Calculate rotation angle based on mouse movement
const rotationAngle = computed(() => {
  if (!props.rotationEffect) return 0
  return Math.random() * 360
})

const createTrailImage = (x: number, y: number) => {
  if (!containerRef.value || props.disabled || props.images.length === 0) return

  const img = document.createElement('img')
  const imageUrl = props.images[currentImageIndex.value % props.images.length]
  
  img.src = imageUrl
  img.style.position = 'absolute'
  img.style.left = `${x - props.imageSize / 2}px`
  img.style.top = `${y - props.imageSize / 2}px`
  img.style.width = `${props.imageSize}px`
  img.style.height = `${props.imageSize}px`
  img.style.pointerEvents = 'none'
  img.style.zIndex = props.zIndex.toString()
  img.style.objectFit = 'cover'
  img.style.borderRadius = '8px'
  img.style.opacity = '0'
  img.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
  
  if (props.scaleEffect) {
    img.style.transform = `scale(0.8) ${props.rotationEffect ? `rotate(${rotationAngle.value}deg)` : ''}`
  }
  
  if (props.rotationEffect) {
    img.style.transform = `rotate(${rotationAngle.value}deg) ${props.scaleEffect ? 'scale(0.8)' : ''}`
  }

  containerRef.value.appendChild(img)
  trailImages.value.push(img)

  // Trigger fade-in animation
  setTimeout(() => {
    img.style.opacity = '1'
    if (props.scaleEffect) {
      img.style.transform = `scale(1) ${props.rotationEffect ? `rotate(${rotationAngle.value}deg)` : ''}`
    }
  }, 10)

  // Start fade-out animation
  setTimeout(() => {
    img.style.opacity = '0'
    if (props.scaleEffect) {
      img.style.transform = `scale(0.6) ${props.rotationEffect ? `rotate(${rotationAngle.value}deg)` : ''}`
    }
  }, props.fadeOutDuration)

  // Remove the image after fade-out
  setTimeout(() => {
    if (img.parentNode) {
      img.parentNode.removeChild(img)
    }
    const index = trailImages.value.indexOf(img)
    if (index > -1) {
      trailImages.value.splice(index, 1)
    }
  }, props.fadeOutDuration + 300)

  // Update image index for next trail
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length

  // Remove excess trail images if needed
  if (trailImages.value.length > props.maxTrailLength) {
    const oldestImage = trailImages.value.shift()
    if (oldestImage && oldestImage.parentNode) {
      oldestImage.parentNode.removeChild(oldestImage)
    }
  }
}

let lastMousePosition = { x: 0, y: 0 }
let lastTrailTime = 0

const handleMouseMove = (event: MouseEvent) => {
  if (!containerRef.value || props.disabled) return

  isMouseInside.value = true
  const rect = containerRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const currentTime = Date.now()
  const distance = Math.sqrt(
    Math.pow(x - lastMousePosition.x, 2) + Math.pow(y - lastMousePosition.y, 2)
  )

  // Only create trail if mouse moved enough distance or enough time passed
  if (distance > props.trailSpacing || currentTime - lastTrailTime > 100) {
    createTrailImage(x, y)
    lastMousePosition = { x, y }
    lastTrailTime = currentTime
  }
}

const handleMouseLeave = () => {
  isMouseInside.value = false
}

const cleanup = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }

  // Remove all trail images
  trailImages.value.forEach(img => {
    if (img.parentNode) {
      img.parentNode.removeChild(img)
    }
  })
  trailImages.value = []
}

onMounted(() => {
  // Initialize any setup if needed
})

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.image-trail-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-trail-container * {
  user-select: none;
}
</style>