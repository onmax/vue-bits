<template>
  <div class="ribbons-demo">
    <TabbedLayout>
      <template #preview>
        <h2 class="demo-title-extra">Corner Ribbons</h2>
        <div class="demo-container relative">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Top corners -->
            <div class="relative bg-white border-2 border-gray-200 rounded-lg h-40 overflow-hidden">
              <Ribbons text="NEW" variant="corner" position="top-left" color="red" />
              <div class="p-4">
                <h3 class="font-semibold text-gray-800">Top Left</h3>
                <p class="text-gray-600 text-sm">Card with top-left corner ribbon</p>
              </div>
            </div>
            
            <div class="relative bg-white border-2 border-gray-200 rounded-lg h-40 overflow-hidden">
              <Ribbons text="SALE" variant="corner" position="top-right" color="blue" />
              <div class="p-4">
                <h3 class="font-semibold text-gray-800">Top Right</h3>
                <p class="text-gray-600 text-sm">Card with top-right corner ribbon</p>
              </div>
            </div>
            
            <!-- Bottom corners -->
            <div class="relative bg-white border-2 border-gray-200 rounded-lg h-40 overflow-hidden">
              <Ribbons text="HOT" variant="corner" position="bottom-left" color="green" />
              <div class="p-4">
                <h3 class="font-semibold text-gray-800">Bottom Left</h3>
                <p class="text-gray-600 text-sm">Card with bottom-left corner ribbon</p>
              </div>
            </div>
            
            <div class="relative bg-white border-2 border-gray-200 rounded-lg h-40 overflow-hidden">
              <Ribbons text="PREMIUM" variant="corner" position="bottom-right" color="purple" />
              <div class="p-4">
                <h3 class="font-semibold text-gray-800">Bottom Right</h3>
                <p class="text-gray-600 text-sm">Card with bottom-right corner ribbon</p>
              </div>
            </div>
          </div>
        </div>

        <h2 class="demo-title-extra">Banner Ribbons</h2>
        <div class="demo-container relative">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Top banner -->
            <div class="relative bg-white border-2 border-gray-200 rounded-lg h-40 overflow-hidden">
              <Ribbons text="FEATURED" variant="banner" position="top" color="yellow" />
              <div class="p-4 pt-12">
                <h3 class="font-semibold text-gray-800">Top Banner</h3>
                <p class="text-gray-600 text-sm">Card with top banner ribbon</p>
              </div>
            </div>
            
            <!-- Bottom banner -->
            <div class="relative bg-white border-2 border-gray-200 rounded-lg h-40 overflow-hidden">
              <Ribbons text="LIMITED TIME" variant="banner" position="bottom" color="pink" />
              <div class="p-4 pb-12">
                <h3 class="font-semibold text-gray-800">Bottom Banner</h3>
                <p class="text-gray-600 text-sm">Card with bottom banner ribbon</p>
              </div>
            </div>
          </div>
        </div>

        <h2 class="demo-title-extra">Side Ribbons</h2>
        <div class="demo-container relative">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left side -->
            <div class="relative bg-white border-2 border-gray-200 rounded-lg h-40 overflow-hidden">
              <Ribbons text="OFFER" variant="side" position="left" color="indigo" />
              <div class="p-4 pl-20">
                <h3 class="font-semibold text-gray-800">Left Side</h3>
                <p class="text-gray-600 text-sm">Card with left side ribbon</p>
              </div>
            </div>
            
            <!-- Right side -->
            <div class="relative bg-white border-2 border-gray-200 rounded-lg h-40 overflow-hidden">
              <Ribbons text="DISCOUNT" variant="side" position="right" color="gray" />
              <div class="p-4 pr-20">
                <h3 class="font-semibold text-gray-800">Right Side</h3>
                <p class="text-gray-600 text-sm">Card with right side ribbon</p>
              </div>
            </div>
          </div>
        </div>

        <h2 class="demo-title-extra">Interactive Controls</h2>
        <div class="demo-container relative">
          <div class="space-y-4 mb-6">
            <div class="flex flex-wrap gap-4">
              <label class="flex items-center gap-2">
                <span class="text-sm font-medium">Variant:</span>
                <select v-model="selectedVariant" class="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  <option value="corner">Corner</option>
                  <option value="banner">Banner</option>
                  <option value="side">Side</option>
                </select>
              </label>
              
              <label class="flex items-center gap-2">
                <span class="text-sm font-medium">Position:</span>
                <select v-model="selectedPosition" class="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  <option v-for="position in availablePositions" :key="position" :value="position">
                    {{ position }}
                  </option>
                </select>
              </label>
              
              <label class="flex items-center gap-2">
                <span class="text-sm font-medium">Color:</span>
                <select v-model="selectedColor" class="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="purple">Purple</option>
                  <option value="pink">Pink</option>
                  <option value="indigo">Indigo</option>
                  <option value="gray">Gray</option>
                </select>
              </label>
              
              <label class="flex items-center gap-2">
                <span class="text-sm font-medium">Size:</span>
                <select v-model="selectedSize" class="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </label>
              
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isAnimated" class="rounded">
                <span class="text-sm font-medium">Animated</span>
              </label>
            </div>
            
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium">Text:</label>
              <input 
                v-model="ribbonText" 
                type="text" 
                placeholder="Enter ribbon text"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
            </div>
          </div>
          
          <div class="relative bg-white border-2 border-gray-200 rounded-lg h-48 overflow-hidden">
            <Ribbons 
              :text="ribbonText"
              :variant="selectedVariant"
              :position="selectedPosition"
              :color="selectedColor"
              :size="selectedSize"
              :animated="isAnimated"
            />
            <div class="p-4" :class="contentPadding">
              <h3 class="font-semibold text-gray-800">Interactive Example</h3>
              <p class="text-gray-600 text-sm">Customize the ribbon using the controls above</p>
            </div>
          </div>
        </div>

        <PropTable :data="propData" />
      </template>

      <template #code>
        <CodeExample :code-object="ribbons" />
      </template>

      <template #cli>
        <CliInstallation :command="ribbons.cli" />
      </template>
    </TabbedLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import TabbedLayout from '../../components/common/TabbedLayout.vue'
import PropTable from '../../components/common/PropTable.vue'
import CliInstallation from '../../components/code/CliInstallation.vue'
import CodeExample from '../../components/code/CodeExample.vue'
import Ribbons from '../../content/Animations/Ribbons/Ribbons.vue'
import { ribbons } from '@/constants/code/Animations/ribbonsCode'

// Interactive controls
const selectedVariant = ref<'corner' | 'banner' | 'side'>('corner')
const selectedPosition = ref<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right'>('top-right')
const selectedColor = ref<'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'gray'>('red')
const selectedSize = ref<'sm' | 'md' | 'lg'>('md')
const isAnimated = ref(true)
const ribbonText = ref('DEMO')

// Position options based on selected variant
const availablePositions = computed(() => {
  switch (selectedVariant.value) {
    case 'corner':
      return ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    case 'banner':
      return ['top', 'bottom']
    case 'side':
      return ['left', 'right']
    default:
      return ['top-right']
  }
})

// Update position when variant changes to ensure valid combination
const updatePosition = () => {
  if (!availablePositions.value.includes(selectedPosition.value)) {
    selectedPosition.value = availablePositions.value[0] as typeof selectedPosition.value
  }
}

// Watch for variant changes to update position
watch(selectedVariant, updatePosition)

// Content padding based on ribbon position
const contentPadding = computed(() => {
  if (selectedVariant.value === 'banner') {
    return selectedPosition.value === 'top' ? 'pt-12' : 'pb-12'
  } else if (selectedVariant.value === 'side') {
    return selectedPosition.value === 'left' ? 'pl-20' : 'pr-20'
  }
  return ''
})

// Props documentation
const propData = [
  {
    name: 'text',
    type: 'string',
    default: '—',
    description: 'The text content displayed on the ribbon.'
  },
  {
    name: 'variant',
    type: 'string',
    default: '"corner"',
    description: 'The ribbon style variant. Options: "corner", "banner", "side".'
  },
  {
    name: 'position',
    type: 'string',
    default: '"top-right"',
    description: 'Position of the ribbon. Options vary by variant: corner (top-left, top-right, bottom-left, bottom-right), banner (top, bottom), side (left, right).'
  },
  {
    name: 'color',
    type: 'string',
    default: '"red"',
    description: 'Color theme of the ribbon. Options: "red", "blue", "green", "yellow", "purple", "pink", "indigo", "gray".'
  },
  {
    name: 'size',
    type: 'string',
    default: '"md"',
    description: 'Size of the ribbon. Options: "sm", "md", "lg".'
  },
  {
    name: 'animated',
    type: 'boolean',
    default: 'true',
    description: 'Whether the ribbon should have hover and entrance animations.'
  },
  {
    name: 'className',
    type: 'string',
    default: '""',
    description: 'Additional CSS classes to apply to the ribbon container.'
  }
]
</script>

<style scoped>
.demo-container {
  min-height: 200px;
  padding: 1rem;
}
</style>