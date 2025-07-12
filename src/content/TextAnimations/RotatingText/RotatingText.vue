<script setup lang="ts">
import { AnimatePresence, Motion, type Target, type Transition, type VariantLabels } from 'motion-v';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface RotatingTextProps {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: any;
  exit?: Target | VariantLabels;
  animatePresenceMode?: 'sync' | 'wait';
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const props = withDefaults(defineProps<RotatingTextProps>(), {
  transition: () => ({
    type: 'spring',
    damping: 25,
    stiffness: 300
  }),
  initial: () => ({ y: '100%', opacity: 0 }) as Target,
  animate: () => ({ y: 0, opacity: 1 }),
  exit: () => ({ y: '-120%', opacity: 0 }) as Target,
  animatePresenceMode: 'wait',
  animatePresenceInitial: false,
  rotationInterval: 2000,
  staggerDuration: 0,
  staggerFrom: 'first',
  loop: true,
  auto: true,
  splitBy: 'characters'
});

const currentTextIndex = ref<number>(0);
let intervalId: number | null = null;

const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), segment => segment.segment);
  }
  return Array.from(text);
};

const elements = computed(() => {
  const currentText: string = props.texts[currentTextIndex.value];

  if (props.splitBy === 'characters') {
    const words = currentText.split(' ');
    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1
    }));
  }
  if (props.splitBy === 'words') {
    return currentText.split(' ').map((word, i, arr) => ({
      characters: [word],
      needsSpace: i !== arr.length - 1
    }));
  }
  if (props.splitBy === 'lines') {
    return currentText.split('\n').map((line, i, arr) => ({
      characters: [line],
      needsSpace: i !== arr.length - 1
    }));
  }

  return currentText.split(props.splitBy).map((part, i, arr) => ({
    characters: [part],
    needsSpace: i !== arr.length - 1
  }));
});

const getStaggerDelay = (index: number, totalChars: number): number => {
  const total = totalChars;

  if (props.staggerFrom === 'first') return index * props.staggerDuration;
  if (props.staggerFrom === 'last') return (total - 1 - index) * props.staggerDuration;
  if (props.staggerFrom === 'center') {
    const center = Math.floor(total / 2);
    return Math.abs(center - index) * props.staggerDuration;
  }
  if (props.staggerFrom === 'random') {
    const randomIndex = Math.floor(Math.random() * total);
    return Math.abs(randomIndex - index) * props.staggerDuration;
  }

  return Math.abs((props.staggerFrom as number) - index) * props.staggerDuration;
};

const handleIndexChange = (newIndex: number) => {
  currentTextIndex.value = newIndex;
  if (props.onNext) props.onNext(newIndex);
};

const next = () => {
  const nextIndex =
    currentTextIndex.value === props.texts.length - 1
      ? props.loop
        ? 0
        : currentTextIndex.value
      : currentTextIndex.value + 1;
  if (nextIndex !== currentTextIndex.value) {
    handleIndexChange(nextIndex);
  }
};

const previous = () => {
  const prevIndex =
    currentTextIndex.value === 0
      ? props.loop
        ? props.texts.length - 1
        : currentTextIndex.value
      : currentTextIndex.value - 1;
  if (prevIndex !== currentTextIndex.value) {
    handleIndexChange(prevIndex);
  }
};

const jumpTo = (index: number) => {
  const validIndex = Math.max(0, Math.min(index, props.texts.length - 1));
  if (validIndex !== currentTextIndex.value) {
    handleIndexChange(validIndex);
  }
};

const reset = () => {
  if (currentTextIndex.value !== 0) {
    handleIndexChange(0);
  }
};

defineExpose({
  next,
  previous,
  jumpTo,
  reset
});

watch(
  () => [props.auto, props.rotationInterval],
  () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    if (props.auto) {
      intervalId = setInterval(next, props.rotationInterval);
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (props.auto) {
    intervalId = setInterval(next, props.rotationInterval);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <Motion
    tag="span"
    :class="cn('flex flex-wrap whitespace-pre-wrap relative', mainClassName)"
    v-bind="$attrs"
    :transition="transition"
    layout
  >
    <span class="sr-only">
      {{ texts[currentTextIndex] }}
    </span>

    <AnimatePresence :mode="animatePresenceMode" :initial="animatePresenceInitial">
      <Motion
        :key="currentTextIndex"
        tag="span"
        :class="cn(splitBy === 'lines' ? 'flex flex-col w-full' : 'flex flex-wrap whitespace-pre-wrap relative')"
        aria-hidden="true"
        layout
      >
        <span v-for="(wordObj, wordIndex) in elements" :key="wordIndex" :class="cn('inline-flex', splitLevelClassName)">
          <Motion
            tag="span"
            v-for="(char, charIndex) in wordObj.characters"
            :key="charIndex"
            :initial="initial"
            :animate="animate"
            :exit="exit"
            :transition="{
              ...transition,
              delay: getStaggerDelay(
                elements.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0) + charIndex,
                elements.reduce((sum, word) => sum + word.characters.length, 0)
              )
            }"
            :class="cn('inline-block', elementLevelClassName)"
          >
            {{ char }}
          </Motion>
          <span v-if="wordObj.needsSpace" class="whitespace-pre"> </span>
        </span>
      </Motion>
    </AnimatePresence>
  </Motion>
</template>
