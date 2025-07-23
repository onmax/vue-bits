<template>
  <div class="gallery-container">
    <div class="gallery-gradient gallery-gradient-left"></div>
    <div class="gallery-gradient gallery-gradient-right"></div>
    <div class="gallery-content">
      <Motion
        tag="div"
        class="gallery-track"
        :style="trackStyle"
        :animate="animateProps"
        :transition="springTransition"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @mousedown="handleMouseDown"
      >
        <div v-for="(url, i) in displayImages" :key="`gallery-${i}`" class="gallery-item" :style="getItemStyle(i)">
          <img :src="url" alt="gallery" class="gallery-img" loading="lazy" decoding="async" />
        </div>
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import { Motion } from 'motion-v';

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
}

const props = withDefaults(defineProps<RollingGalleryProps>(), {
  autoplay: false,
  pauseOnHover: false,
  images: () => []
});

const DEFAULT_IMAGES = shallowRef([
  'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]);

const isScreenSizeSm = ref(false);
const rotateYValue = ref(0);
const autoplayInterval = ref<number | null>(null);
const autoplayTimeout = ref<number | null>(null);
const isDragging = ref(false);
const isHovered = ref(false);
const dragStartX = ref(0);
const dragStartRotation = ref(0);

const displayImages = computed(() => {
  const sourceImages = props.images.length > 0 ? props.images : DEFAULT_IMAGES.value;
  const maxImages = REFERENCE_FACE_COUNT_SPACING;

  if (sourceImages.length >= maxImages) {
    return sourceImages;
  }

  const repeatedImages = [];
  const repetitions = Math.ceil(maxImages / sourceImages.length);

  for (let i = 0; i < repetitions; i++) {
    repeatedImages.push(...sourceImages);
  }

  return repeatedImages.slice(0, maxImages);
});

const cylinderWidth = computed(() => (isScreenSizeSm.value ? 1100 : 1800));
const faceWidth = computed(() => {
  return (cylinderWidth.value / REFERENCE_FACE_COUNT_SIZING) * 1.5;
});
const radius = computed(() => cylinderWidth.value / (2 * Math.PI));

const DRAG_FACTOR = Object.freeze(0.15);
const MOMENTUM_FACTOR = Object.freeze(0.05);
const AUTOPLAY_INTERVAL = Object.freeze(2000);
const DRAG_RESTART_DELAY = Object.freeze(1500);
const HOVER_RESTART_DELAY = Object.freeze(100);
const HOVER_DEBOUNCE_DELAY = Object.freeze(50);
const REFERENCE_FACE_COUNT_SPACING = Object.freeze(10);
const REFERENCE_FACE_COUNT_SIZING = Object.freeze(10);

const trackStyle = computed(() => ({
  width: `${cylinderWidth.value}px`,
  transformStyle: 'preserve-3d' as const
}));

const animateProps = computed(() => ({
  rotateY: rotateYValue.value
}));

const springTransition = computed(() => {
  if (isDragging.value) {
    return { duration: 0 };
  } else {
    return {
      duration: 0.8,
      ease: 'easeOut' as const
    };
  }
});

const styleCache = new Map<string, { width: string; transform: string }>();

const getItemStyle = (index: number) => {
  // Create a cache key based on current values
  const cacheKey = `${index}-${faceWidth.value}-${radius.value}`;

  // Return a cached result if available
  if (styleCache.has(cacheKey)) {
    return styleCache.get(cacheKey)!;
  }

  // Calculate and cache new style
  const style = {
    width: `${faceWidth.value}px`,
    transform: `rotateY(${index * (360 / REFERENCE_FACE_COUNT_SPACING)}deg) translateZ(${radius.value}px)`
  };

  // Limit cache size to prevent memory leaks
  if (styleCache.size > 50) {
    styleCache.clear();
  }

  styleCache.set(cacheKey, style);
  return style;
};

let resizeTimeout: number | null = null;
let hoverTimeout: number | null = null;

function checkScreenSize() {
  isScreenSizeSm.value = window.innerWidth <= 640;
}

function throttledResize() {
  if (resizeTimeout) return;
  resizeTimeout = setTimeout(() => {
    checkScreenSize();
    resizeTimeout = null;
  }, 100);
}

function handleMouseDown(event: MouseEvent) {
  isDragging.value = true;
  dragStartX.value = event.clientX;
  dragStartRotation.value = rotateYValue.value;

  stopAutoplay();

  document.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseup', handleMouseUp, { passive: true });
  event.preventDefault();
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging.value) return;

  const deltaX = event.clientX - dragStartX.value;
  const rotationDelta = deltaX * DRAG_FACTOR;
  rotateYValue.value = dragStartRotation.value + rotationDelta;
}

function handleMouseUp(event: MouseEvent) {
  if (!isDragging.value) return;

  isDragging.value = false;

  const deltaX = event.clientX - dragStartX.value;
  const velocity = deltaX * MOMENTUM_FACTOR;
  rotateYValue.value += velocity;

  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);

  stopAutoplay();

  if (props.autoplay) {
    if (props.pauseOnHover && isHovered.value) {
      return;
    } else {
      autoplayTimeout.value = setTimeout(() => {
        if (!isDragging.value && (!props.pauseOnHover || !isHovered.value)) {
          startAutoplay();
        }
      }, DRAG_RESTART_DELAY);
    }
  }
}

function startAutoplay() {
  if (!props.autoplay || isDragging.value || (props.pauseOnHover && isHovered.value)) return;

  stopAutoplay();

  autoplayInterval.value = setInterval(() => {
    if (!isDragging.value && (!props.pauseOnHover || !isHovered.value)) {
      rotateYValue.value -= 360 / REFERENCE_FACE_COUNT_SPACING;
    }
  }, AUTOPLAY_INTERVAL);
}

function stopAutoplay() {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
  if (autoplayTimeout.value) {
    clearTimeout(autoplayTimeout.value);
    autoplayTimeout.value = null;
  }
}

function handleMouseEnter() {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }

  hoverTimeout = setTimeout(() => {
    isHovered.value = true;

    if (props.autoplay && props.pauseOnHover && !isDragging.value) {
      stopAutoplay();
    }
  }, HOVER_DEBOUNCE_DELAY);
}

function handleMouseLeave() {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }

  hoverTimeout = setTimeout(() => {
    isHovered.value = false;

    if (props.autoplay && props.pauseOnHover && !isDragging.value) {
      stopAutoplay();
      autoplayTimeout.value = setTimeout(() => {
        if (props.autoplay && !isDragging.value && !isHovered.value) {
          startAutoplay();
        }
      }, HOVER_RESTART_DELAY);
    }
  }, HOVER_DEBOUNCE_DELAY);
}

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', throttledResize, { passive: true });

  if (props.autoplay) {
    startAutoplay();
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', throttledResize);
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
  stopAutoplay();
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }
});

watch(
  () => props.autoplay,
  newVal => {
    stopAutoplay();
    if (newVal && !isDragging.value && (!props.pauseOnHover || !isHovered.value)) {
      autoplayTimeout.value = setTimeout(() => {
        if (!isDragging.value && (!props.pauseOnHover || !isHovered.value)) {
          startAutoplay();
        }
      }, HOVER_RESTART_DELAY);
    }
  }
);

watch(
  () => props.pauseOnHover,
  () => {
    if (props.autoplay) {
      stopAutoplay();
      if (!isDragging.value && (!props.pauseOnHover || !isHovered.value)) {
        startAutoplay();
      }
    }
  }
);
</script>

<style scoped>
.gallery-container {
  position: relative;
  height: 500px;
  width: 100%;
  overflow: hidden;
}

.gallery-gradient {
  position: absolute;
  top: 0;
  height: 100%;
  width: 48px;
  z-index: 10;
}

.gallery-gradient-left {
  left: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, #060010 100%);
}

.gallery-gradient-right {
  right: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, #060010 100%);
}

.gallery-content {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.gallery-track {
  display: flex;
  height: auto;
  min-height: 200px;
  justify-content: center;
  align-items: center;
  cursor: grab;
  transform-style: preserve-3d;
  width: 100%;
  user-select: none;
  will-change: transform;
  pointer-events: auto;
}

.gallery-track:active {
  cursor: grabbing;
}

.gallery-item {
  position: absolute;
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: center;
  padding: 8%;
  backface-visibility: hidden;
  will-change: transform;
  pointer-events: none;
}

.gallery-img {
  pointer-events: auto;
  height: 120px;
  width: 300px;
  border-radius: 15px;
  border: 3px solid #fff;
  object-fit: cover;
  transition: transform 0.3s ease;
  will-change: transform;
}

.gallery-item:hover .gallery-img {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .gallery-item {
    padding: 6%;
  }
  .gallery-img {
    height: 100px;
    width: 220px;
  }
}
</style>
