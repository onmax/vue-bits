<template>
  <div ref="containerRef" :class="className" :style="style" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, type CSSProperties } from 'vue'
import { Renderer, Program, Mesh, Plane, Camera } from 'ogl'

interface NoiseProps {
  speed?: number
  scale?: number
  color?: string
  intensity?: number
  frequency?: number
  className?: string
  style?: CSSProperties
}

const props = withDefaults(defineProps<NoiseProps>(), {
  speed: 1,
  scale: 1,
  color: '#ffffff',
  intensity: 1,
  frequency: 0.5,
  className: '',
  style: () => ({})
})

const containerRef = ref<HTMLDivElement>()

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255
  return [r, g, b]
}

const vertexShader = `
attribute vec2 uv;
attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uIntensity;
uniform float uFrequency;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 0.0;
  
  for (int i = 0; i < 6; i++) {
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}

void main() {
  vec2 st = vUv * uScale;
  st += uTime * uSpeed * uFrequency;
  
  float n = fbm(st);
  n = smoothstep(0.0, 1.0, n);
  
  vec3 color = uColor * n * uIntensity;
  
  gl_FragColor = vec4(color, n * 0.8);
}
`

let renderer: Renderer | null = null
let mesh: Mesh | null = null
let program: Program | null = null
let camera: Camera | null = null
let animateId = 0

const initNoise = () => {
  const container = containerRef.value
  if (!container) return

  renderer = new Renderer({
    alpha: true,
    antialias: true,
  })

  const gl = renderer.gl
  gl.clearColor(0, 0, 0, 0)
  gl.canvas.style.backgroundColor = 'transparent'

  camera = new Camera(gl, { fov: 75 })
  camera.position.z = 1

  const resize = () => {
    if (!container || !camera) return
    
    let width = container.offsetWidth
    let height = container.offsetHeight
    
    let parent = container.parentElement
    while (parent && (!width || !height)) {
      if (parent.offsetWidth && parent.offsetHeight) {
        width = parent.offsetWidth
        height = parent.offsetHeight
        break
      }
      parent = parent.parentElement
    }
    
    if (!width || !height) {
      width = window.innerWidth
      height = window.innerHeight
    }
    
    width = Math.max(width, 300)
    height = Math.max(height, 300)
        
    renderer!.setSize(width, height)
    camera.perspective({ aspect: width / height })

    if (mesh) {
      const distance = camera.position.z
      const fov = camera.fov * (Math.PI / 180)
      const height2 = 2 * Math.tan(fov / 2) * distance
      const width2 = height2 * (width / height)

      mesh.scale.set(width2, height2, 1)
    }
  }

  window.addEventListener('resize', resize)

  const geometry = new Plane(gl, {
    width: 1,
    height: 1,
  })

  const colorRGB = hexToNormalizedRGB(props.color)

  program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uSpeed: { value: props.speed },
      uScale: { value: props.scale },
      uIntensity: { value: props.intensity },
      uFrequency: { value: props.frequency },
      uColor: { value: colorRGB },
      uTime: { value: 0 },
    },
  })

  mesh = new Mesh(gl, { geometry, program })
  container.appendChild(gl.canvas)

  gl.canvas.style.width = '100%'
  gl.canvas.style.height = '100%'
  gl.canvas.style.display = 'block'
  gl.canvas.style.position = 'absolute'
  gl.canvas.style.top = '0'
  gl.canvas.style.left = '0'
  gl.canvas.style.zIndex = '1'

  let lastTime = 0
  const update = (t: number) => {
    animateId = requestAnimationFrame(update)
    const deltaTime = (t - lastTime) / 1000
    lastTime = t

    if (program && mesh && camera) {
      program.uniforms.uTime.value += 0.1 * deltaTime
      program.uniforms.uSpeed.value = props.speed
      program.uniforms.uScale.value = props.scale
      program.uniforms.uIntensity.value = props.intensity
      program.uniforms.uFrequency.value = props.frequency
      program.uniforms.uColor.value = hexToNormalizedRGB(props.color)
      renderer!.render({ scene: mesh, camera })
    }
  }
  animateId = requestAnimationFrame(update)

  resize()

  return () => {
    cancelAnimationFrame(animateId)
    window.removeEventListener('resize', resize)
    if (container && gl.canvas.parentNode === container) {
      container.removeChild(gl.canvas)
    }
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}

const cleanup = () => {
  if (animateId) {
    cancelAnimationFrame(animateId)
  }
  if (renderer) {
    const gl = renderer.gl
    const container = containerRef.value
    if (container && gl.canvas.parentNode === container) {
      container.removeChild(gl.canvas)
    }
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
  renderer = null
  mesh = null
  camera = null
  program = null
}

onMounted(() => {
  initNoise()
})

onUnmounted(() => {
  cleanup()
})

watch(
  () => [props.speed, props.scale, props.color, props.intensity, props.frequency],
  () => {}
)
</script>

<style scoped>
div {
  width: 100% !important;
  height: 100% !important;
  min-height: 100% !important;
  display: block !important;
}

:deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  min-height: 100% !important;
  display: block !important;
  object-fit: cover !important;
}
</style>