<script setup lang="ts">
import { ref, onUnmounted, watch, nextTick, computed } from "vue";

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

const props = withDefaults(defineProps<TrueFocusProps>(), {
  sentence: "True Focus",
  manualMode: false,
  blurAmount: 5,
  borderColor: "green",
  glowColor: "rgba(0, 255, 0, 0.6)",
  animationDuration: 0.5,
  pauseBetweenAnimations: 1,
});

const words = computed(() => props.sentence.split(" "));
const currentIndex = ref(0);
const lastActiveIndex = ref<number | null>(null);
const containerRef = ref<HTMLDivElement>();
const wordRefs = ref<HTMLSpanElement[]>([]);
const focusRect = ref({ x: 0, y: 0, width: 0, height: 0 });

let interval: number | null = null;

watch(
  [
    () => props.manualMode,
    () => props.animationDuration,
    () => props.pauseBetweenAnimations,
    words,
  ],
  () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }

    if (!props.manualMode) {
      interval = setInterval(
        () => {
          currentIndex.value = (currentIndex.value + 1) % words.value.length;
        },
        (props.animationDuration + props.pauseBetweenAnimations) * 1000,
      );
    }
  },
  { immediate: true },
);

watch(
  [currentIndex, words],
  async () => {
    if (currentIndex.value === null || currentIndex.value === -1) return;
    if (!wordRefs.value[currentIndex.value] || !containerRef.value) return;

    await nextTick();

    const parentRect = containerRef.value.getBoundingClientRect();
    const activeRect = wordRefs.value[currentIndex.value].getBoundingClientRect();

    focusRect.value = {
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    };
  },
  { immediate: true },
);

const handleMouseEnter = (index: number) => {
  if (props.manualMode) {
    lastActiveIndex.value = index;
    currentIndex.value = index;
  }
};

const handleMouseLeave = () => {
  if (props.manualMode) {
    currentIndex.value = lastActiveIndex.value || 0;
  }
};

const setWordRef = (el: HTMLSpanElement | null, index: number) => {
  if (el) {
    wordRefs.value[index] = el;
  }
};

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<template>
  <div class="focus-container" ref="containerRef">
    <span
      v-for="(word, index) in words"
      :key="index"
      :ref="(el) => setWordRef(el as HTMLSpanElement, index)"
      :class="[
        'focus-word',
        { manual: manualMode },
        { active: index === currentIndex && !manualMode },
      ]"
      :style="{
        filter: index === currentIndex ? 'blur(0px)' : `blur(${blurAmount}px)`,
        '--border-color': borderColor,
        '--glow-color': glowColor,
        transition: `filter ${animationDuration}s ease`,
      }"
      @mouseenter="handleMouseEnter(index)"
      @mouseleave="handleMouseLeave"
    >
      {{ word }}
    </span>

    <div
      class="focus-frame"
      :style="{
        '--border-color': borderColor,
        '--glow-color': glowColor,
        transform: `translate(${focusRect.x}px, ${focusRect.y}px)`,
        width: `${focusRect.width}px`,
        height: `${focusRect.height}px`,
        opacity: currentIndex >= 0 ? 1 : 0,
        transition: `all ${animationDuration}s ease`,
      }"
    >
      <span class="top-left corner"></span>
      <span class="top-right corner"></span>
      <span class="bottom-left corner"></span>
      <span class="bottom-right corner"></span>
    </div>
  </div>
</template>

<style scoped>
.focus-container {
  position: relative;
  display: flex;
  gap: 1em;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.focus-word {
  position: relative;
  font-size: 3rem;
  font-weight: 900;
  cursor: pointer;
  transition:
    filter 0.3s ease,
    color 0.3s ease;
}

.focus-word.active {
  filter: blur(0);
}

.focus-frame {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  box-sizing: content-box;
  border: none;
}

.corner {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 3px solid var(--border-color, #fff);
  filter: drop-shadow(0px 0px 4px var(--border-color, #fff));
  border-radius: 3px;
  transition: none;
}

.top-left {
  top: -10px;
  left: -10px;
  border-right: none;
  border-bottom: none;
}

.top-right {
  top: -10px;
  right: -10px;
  border-left: none;
  border-bottom: none;
}

.bottom-left {
  bottom: -10px;
  left: -10px;
  border-right: none;
  border-top: none;
}

.bottom-right {
  bottom: -10px;
  right: -10px;
  border-left: none;
  border-top: none;
}
</style>
