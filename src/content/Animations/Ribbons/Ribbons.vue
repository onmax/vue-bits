<template>
  <div class="relative inline-block">
    <!-- Corner Ribbons -->
    <div
      v-if="variant === 'corner'"
      :class="[
        'absolute z-10 overflow-hidden transform',
        cornerPositionClasses,
        sizeClasses,
        cornerTransformClasses,
        animationClasses
      ]"
    >
      <div
        :class="[
          'relative text-white text-center font-medium shadow-lg',
          colorClasses,
          cornerInnerClasses,
          'before:absolute before:inset-0 before:bg-black before:bg-opacity-20'
        ]"
      >
        <span class="relative z-10">{{ text }}</span>
      </div>
    </div>

    <!-- Banner Ribbons -->
    <div
      v-if="variant === 'banner'"
      :class="[
        'absolute z-10 left-0 right-0 text-white text-center font-medium shadow-lg',
        bannerPositionClasses,
        sizeClasses,
        colorClasses,
        animationClasses,
        'before:absolute before:left-0 before:top-0 before:w-0 before:h-0',
        'after:absolute after:right-0 after:top-0 after:w-0 after:h-0',
        bannerArrowClasses
      ]"
    >
      <span class="relative z-10 px-4">{{ text }}</span>
    </div>

    <!-- Side Ribbons -->
    <div
      v-if="variant === 'side'"
      :class="[
        'absolute z-10 text-white text-center font-medium shadow-lg',
        sidePositionClasses,
        sizeClasses,
        colorClasses,
        animationClasses,
        'before:absolute before:bottom-0 before:w-0 before:h-0',
        sideArrowClasses
      ]"
    >
      <span class="relative z-10 px-3 py-2">{{ text }}</span>
    </div>

    <!-- Slot for content that the ribbon wraps -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text: string
  variant?: 'corner' | 'banner' | 'side'
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right'
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'gray'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'corner',
  position: 'top-right',
  color: 'red',
  size: 'md',
  animated: true,
  className: ''
})

// Color classes using the project's color system
const colorClasses = computed(() => {
  const colors = {
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
    indigo: 'bg-indigo-500 hover:bg-indigo-600',
    gray: 'bg-gray-500 hover:bg-gray-600'
  }
  return colors[props.color]
})

// Size classes for different ribbon sizes
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  return sizes[props.size]
})

// Corner ribbon positioning
const cornerPositionClasses = computed(() => {
  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  }
  return positions[props.position as keyof typeof positions] || positions['top-right']
})

// Corner ribbon transforms for diagonal positioning
const cornerTransformClasses = computed(() => {
  const transforms = {
    'top-left': '-rotate-45 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'rotate-45 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'rotate-45 -translate-x-1/2 translate-y-1/2',
    'bottom-right': '-rotate-45 translate-x-1/2 translate-y-1/2'
  }
  return transforms[props.position as keyof typeof transforms] || transforms['top-right']
})

// Corner ribbon inner styling
const cornerInnerClasses = computed(() => {
  const widthSizes = {
    sm: 'w-16 py-1',
    md: 'w-20 py-1.5',
    lg: 'w-24 py-2'
  }
  return widthSizes[props.size]
})

// Banner ribbon positioning
const bannerPositionClasses = computed(() => {
  const positions = {
    top: 'top-0',
    bottom: 'bottom-0'
  }
  return positions[props.position as keyof typeof positions] || positions['top']
})

// Banner ribbon arrow styling
const bannerArrowClasses = computed(() => {
  const arrowColor = {
    red: 'before:border-l-red-700 before:border-r-red-700 after:border-l-red-700 after:border-r-red-700',
    blue: 'before:border-l-blue-700 before:border-r-blue-700 after:border-l-blue-700 after:border-r-blue-700',
    green: 'before:border-l-green-700 before:border-r-green-700 after:border-l-green-700 after:border-r-green-700',
    yellow: 'before:border-l-yellow-700 before:border-r-yellow-700 after:border-l-yellow-700 after:border-r-yellow-700',
    purple: 'before:border-l-purple-700 before:border-r-purple-700 after:border-l-purple-700 after:border-r-purple-700',
    pink: 'before:border-l-pink-700 before:border-r-pink-700 after:border-l-pink-700 after:border-r-pink-700',
    indigo: 'before:border-l-indigo-700 before:border-r-indigo-700 after:border-l-indigo-700 after:border-r-indigo-700',
    gray: 'before:border-l-gray-700 before:border-r-gray-700 after:border-l-gray-700 after:border-r-gray-700'
  }
  
  const sizeClasses = {
    sm: 'before:border-l-8 before:border-r-0 before:border-t-4 before:border-b-4 after:border-r-8 after:border-l-0 after:border-t-4 after:border-b-4',
    md: 'before:border-l-10 before:border-r-0 before:border-t-5 before:border-b-5 after:border-r-10 after:border-l-0 after:border-t-5 after:border-b-5',
    lg: 'before:border-l-12 before:border-r-0 before:border-t-6 before:border-b-6 after:border-r-12 after:border-l-0 after:border-t-6 after:border-b-6'
  }
  
  return `${arrowColor[props.color]} ${sizeClasses[props.size]}`
})

// Side ribbon positioning
const sidePositionClasses = computed(() => {
  const positions = {
    left: 'left-0 top-1/2 -translate-y-1/2',
    right: 'right-0 top-1/2 -translate-y-1/2'
  }
  return positions[props.position as keyof typeof positions] || positions['left']
})

// Side ribbon arrow styling
const sideArrowClasses = computed(() => {
  const arrowColor = {
    red: 'before:border-l-red-700 before:border-r-red-700',
    blue: 'before:border-l-blue-700 before:border-r-blue-700',
    green: 'before:border-l-green-700 before:border-r-green-700',
    yellow: 'before:border-l-yellow-700 before:border-r-yellow-700',
    purple: 'before:border-l-purple-700 before:border-r-purple-700',
    pink: 'before:border-l-pink-700 before:border-r-pink-700',
    indigo: 'before:border-l-indigo-700 before:border-r-indigo-700',
    gray: 'before:border-l-gray-700 before:border-r-gray-700'
  }
  
  const sizeClasses = {
    sm: 'before:border-l-4 before:border-r-4 before:border-t-6',
    md: 'before:border-l-5 before:border-r-5 before:border-t-8',
    lg: 'before:border-l-6 before:border-r-6 before:border-t-10'
  }
  
  const positionClasses = {
    left: 'before:left-0',
    right: 'before:right-0'
  }
  
  return `${arrowColor[props.color]} ${sizeClasses[props.size]} ${positionClasses[props.position as keyof typeof positionClasses] || positionClasses['left']}`
})

// Animation classes for hover and entrance effects
const animationClasses = computed(() => {
  if (!props.animated) return ''
  
  const baseAnimations = 'transition-all duration-300 ease-in-out'
  
  if (props.variant === 'corner') {
    return `${baseAnimations} hover:scale-110 transform-gpu`
  } else if (props.variant === 'banner') {
    return `${baseAnimations} hover:shadow-xl animate-pulse`
  } else if (props.variant === 'side') {
    return `${baseAnimations} hover:translate-x-1 hover:shadow-lg`
  }
  
  return baseAnimations
})
</script>

<style scoped>
/* Custom animations for ribbon entrance */
@keyframes ribbonSlideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes ribbonFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Apply entrance animations when component mounts */
.animate-pulse {
  animation: ribbonFadeIn 0.5s ease-out;
}
</style>