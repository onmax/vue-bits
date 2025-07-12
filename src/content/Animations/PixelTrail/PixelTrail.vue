<template>
  <div 
    ref="containerRef"
    class="relative w-full h-full overflow-hidden"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <canvas
      ref="canvasRef"
      class="absolute inset-0 pointer-events-none"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  life: number
  maxLife: number
  color: string
}

interface Props {
  particleColor?: string
  particleSize?: number
  particleCount?: number
  trailLength?: number
  fadeSpeed?: number
  spawnRate?: number
  randomOffset?: number
  blendMode?: GlobalCompositeOperation
}

const props = withDefaults(defineProps<Props>(), {
  particleColor: '#ffffff',
  particleSize: 4,
  particleCount: 50,
  trailLength: 20,
  fadeSpeed: 0.05,
  spawnRate: 2,
  randomOffset: 10,
  blendMode: 'normal' as GlobalCompositeOperation
})

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const particles = ref<Particle[]>([])
const mousePos = ref({ x: 0, y: 0 })
const isMouseInside = ref(false)
const animationId = ref<number | null>(null)
const lastSpawnTime = ref(0)

const spawnInterval = computed(() => 1000 / props.spawnRate)

const createParticle = (x: number, y: number): Particle => {
  const offsetX = (Math.random() - 0.5) * props.randomOffset
  const offsetY = (Math.random() - 0.5) * props.randomOffset
  
  return {
    x: x + offsetX,
    y: y + offsetY,
    size: props.particleSize * (0.5 + Math.random() * 0.5),
    opacity: 1,
    life: 0,
    maxLife: props.trailLength,
    color: props.particleColor
  }
}

const updateParticles = () => {
  particles.value = particles.value.filter(particle => {
    particle.life += 1
    particle.opacity = Math.max(0, 1 - (particle.life / particle.maxLife))
    return particle.opacity > 0
  })
}

const spawnParticles = (timestamp: number) => {
  if (!isMouseInside.value) return
  
  if (timestamp - lastSpawnTime.value > spawnInterval.value) {
    if (particles.value.length < props.particleCount) {
      particles.value.push(createParticle(mousePos.value.x, mousePos.value.y))
    }
    lastSpawnTime.value = timestamp
  }
}

const draw = (timestamp: number) => {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!ctx || !canvas) return
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.globalCompositeOperation = props.blendMode
  
  spawnParticles(timestamp)
  updateParticles()
  
  particles.value.forEach(particle => {
    ctx.save()
    ctx.globalAlpha = particle.opacity
    ctx.fillStyle = particle.color
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })
  
  animationId.value = requestAnimationFrame(draw)
}

const handleMouseMove = (e: MouseEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const rect = canvas.getBoundingClientRect()
  mousePos.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

const handleMouseEnter = () => {
  isMouseInside.value = true
}

const handleMouseLeave = () => {
  isMouseInside.value = false
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const parent = canvas.parentElement
  if (!parent) return

  const { width, height } = parent.getBoundingClientRect()
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }
}

let resizeTimeout: number
const handleResize = () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(resizeCanvas, 100)
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const parent = canvas.parentElement
  if (!parent) return

  resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(parent)

  resizeCanvas()
  animationId.value = requestAnimationFrame(draw)
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  clearTimeout(resizeTimeout)
  
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})

watch([
  () => props.particleColor,
  () => props.particleSize,
  () => props.particleCount,
  () => props.trailLength,
  () => props.fadeSpeed,
  () => props.spawnRate,
  () => props.randomOffset,
  () => props.blendMode
], () => {
  particles.value = []
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
  animationId.value = requestAnimationFrame(draw)
})
</script>