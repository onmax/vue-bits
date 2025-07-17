<template>
  <div :style="{transform: `scale(${props.size})`}" :class="class">
    <div
      :class="folderClass"
      :style="folderStyle"
      @click="handleClick"
    >
      <div class="folder_back">
        <div
          v-for="(item, i) in papers"
          :key="i"
          :class="`paper paper-${i + 1}`"
          @mousemove="(e) => handlePaperMouseMove(e, i)"
          @mouseleave="(e) => handlePaperMouseLeave(e, i)"
          :style="open ? {
            '--magnet-x': `${paperOffsets[i]?.x || 0}px`,
            '--magnet-y': `${paperOffsets[i]?.y || 0}px`,
          } : {}"
        >
          <slot 
            :name="`item-${i + 1}`" 
            :item="item" 
            :index="i"
            :isOpen="open"
          >
            {{ item }}
          </slot>
        </div>
        <div class="folder_front"></div>
        <div class="folder_front right"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Definir tipos
interface PaperOffset {
  x: number
  y: number
}

interface Props {
  color?: string
  size?: number
  items?: (string | null)[]
  class?: string
}

// Props con valores por defecto
const props = withDefaults(defineProps<Props>(), {
  color: '#5227FF',
  size: 1,
  items: () => [],
  class: ''
})

// Función para oscurecer colores
const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex
  if (color.length === 3) {
    color = color
      .split('')
      .map((c) => c + c)
      .join('')
  }
  const num = parseInt(color, 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))))
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))))
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))))
  return (
    '#' +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  )
}

// Estado reactivo
const open = ref(false)
const maxItems = 3
const paperOffsets = ref<PaperOffset[]>(
  Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
)

// Computed properties
const papers = computed(() => {
  const result = props.items.slice(0, maxItems)
  while (result.length < maxItems) {
    result.push(null)
  }
  return result
})

const folderBackColor = computed(() => darkenColor(props.color, 0.08))
const paper1 = computed(() => darkenColor('#ffffff', 0.1))
const paper2 = computed(() => darkenColor('#ffffff', 0.05))
const paper3 = computed(() => '#ffffff')

const folderStyle = computed(() => ({
  '--folder-color': props.color,
  '--folder-back-color': folderBackColor.value,
  '--paper-1': paper1.value,
  '--paper-2': paper2.value,
  '--paper-3': paper3.value,
}))

const folderClass = computed(() => `folder ${open.value ? 'open' : ''}`.trim())

const scaleStyle = computed(() => ({
  transform: `scale(${props.size})`
}))

// Métodos
const handleClick = () => {
  open.value = !open.value
  if (!open.value) {
    paperOffsets.value = Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  }
}

const handlePaperMouseMove = (e: MouseEvent, index: number) => {
  if (!open.value) return
  
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const offsetX = (e.clientX - centerX) * 0.15
  const offsetY = (e.clientY - centerY) * 0.15
  
  paperOffsets.value = paperOffsets.value.map((offset, i) => 
    i === index ? { x: offsetX, y: offsetY } : offset
  )
}

const handlePaperMouseLeave = (e: MouseEvent, index: number) => {
  paperOffsets.value = paperOffsets.value.map((offset, i) => 
    i === index ? { x: 0, y: 0 } : offset
  )
}
</script>

<style scoped>
:root {
  --folder-color: #70a1ff;
  --folder-back-color: #4785ff;
  --paper-1: #e6e6e6;
  --paper-2: #f2f2f2;
  --paper-3: #ffffff;
}

.folder {
  transition: all 0.2s ease-in;
  cursor: pointer;
}

.folder:not(.folder--click):hover {
  transform: translateY(-8px);
}

.folder:not(.folder--click):hover .paper {
  transform: translate(-50%, 0%);
}

.folder:not(.folder--click):hover .folder_front {
  transform: skew(15deg) scaleY(0.6);
}

.folder:not(.folder--click):hover .right {
  transform: skew(-15deg) scaleY(0.6);
}

.folder.open {
  transform: translateY(-8px);
}

.folder.open .paper:nth-child(1) {
  transform: translate(-120%, -70%) rotateZ(-15deg);
}

.folder.open .paper:nth-child(1):hover {
  transform: translate(-120%, -70%) rotateZ(-15deg) scale(1.1);
  z-index: 3;
}

.folder.open .paper:nth-child(2) {
  transform: translate(10%, -70%) rotateZ(15deg);
  height: 80%;
}

.folder.open .paper:nth-child(2):hover {
  transform: translate(10%, -70%) rotateZ(15deg) scale(1.1);
  z-index: 3;
}

.folder.open .paper:nth-child(3) {
  transform: translate(-50%, -100%) rotateZ(5deg);
  height: 80%;
}

.folder.open .paper:nth-child(3):hover {
  transform: translate(-50%, -100%) rotateZ(5deg) scale(1.1);
  z-index: 3;
}

.folder.open .folder_front {
  transform: skew(15deg) scaleY(0.6);
}

.folder.open .right {
  transform: skew(-15deg) scaleY(0.6);
}

.folder_back {
  position: relative;
  width: 100px;
  height: 80px;
  background: var(--folder-back-color);
  border-radius: 0px 10px 10px 10px;
}

.folder_back::after {
  position: absolute;
  z-index: 0;
  bottom: 98%;
  left: 0;
  content: "";
  width: 30px;
  height: 10px;
  background: var(--folder-back-color);
  border-radius: 5px 5px 0 0;
}

.paper {
  position: absolute;
  z-index: 2;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 10%);
  width: 70%;
  height: 80%;
  background: var(--paper-1);
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.paper:nth-child(2) {
  background: var(--paper-2);
  width: 80%;
  height: 70%;
}

.paper:nth-child(3) {
  background: var(--paper-3);
  width: 90%;
  height: 60%;
}

.folder_front {
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: var(--folder-color);
  border-radius: 5px 10px 10px 10px;
  transform-origin: bottom;
  transition: all 0.3s ease-in-out;
}
</style>