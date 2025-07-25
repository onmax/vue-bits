<template>
  <div ref="containerRef" :class="`relative w-[500px] ${className}`.trim()">
    <div
      ref="listRef"
      :class="`max-h-[400px] overflow-y-auto p-4 ${
        displayScrollbar
          ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#0b0b0b] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]'
          : 'scrollbar-hide'
      }`"
      :style="{
        scrollbarWidth: displayScrollbar ? 'thin' : 'none',
        scrollbarColor: '#222 #0b0b0b'
      }"
      @scroll="handleScroll"
    >
      <Motion
        v-for="(item, index) in items"
        :key="index"
        tag="div"
        :data-index="index"
        class="mb-4 cursor-pointer"
        :initial="{ scale: 0.7, opacity: 0 }"
        :animate="getItemInView(index) ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }"
        :transition="{ duration: 0.2, delay: 0.1 }"
        @mouseenter="() => setSelectedIndex(index)"
        @click="
          () => {
            setSelectedIndex(index);
            emit('itemSelected', item, index);
          }
        "
      >
        <div :class="`p-4 bg-[#111] rounded-lg ${selectedIndex === index ? 'bg-[#222]' : ''} ${itemClassName}`">
          <p class="text-white m-0">{{ item }}</p>
        </div>
      </Motion>
    </div>
    <div
      v-if="showGradients"
      class="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-[#0b0b0b] to-transparent pointer-events-none transition-opacity duration-300 ease"
      :style="{ opacity: topGradientOpacity }"
    />
    <div
      v-if="showGradients"
      class="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#0b0b0b] to-transparent pointer-events-none transition-opacity duration-300 ease"
      :style="{ opacity: bottomGradientOpacity }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, useTemplateRef } from 'vue';
import { Motion } from 'motion-v';

interface AnimatedListProps {
  items?: string[];
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
}

const props = withDefaults(defineProps<AnimatedListProps>(), {
  items: () => [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15'
  ],
  showGradients: true,
  enableArrowNavigation: true,
  className: '',
  itemClassName: '',
  displayScrollbar: true,
  initialSelectedIndex: -1
});

const emit = defineEmits<{
  itemSelected: [item: string, index: number];
}>();

const containerRef = useTemplateRef<HTMLDivElement>('containerRef');
const listRef = useTemplateRef<HTMLDivElement>('listRef');
const selectedIndex = ref(props.initialSelectedIndex);
const keyboardNav = ref(false);
const topGradientOpacity = ref(0);
const bottomGradientOpacity = ref(1);
const itemsInView = ref<boolean[]>([]);

const setSelectedIndex = (index: number) => {
  selectedIndex.value = index;
};

const getItemInView = (index: number) => {
  return itemsInView.value[index] ?? false;
};

const handleScroll = (e: Event) => {
  const target = e.target as HTMLDivElement;
  const { scrollTop, scrollHeight, clientHeight } = target;
  topGradientOpacity.value = Math.min(scrollTop / 50, 1);
  const bottomDistance = scrollHeight - (scrollTop + clientHeight);
  bottomGradientOpacity.value = scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1);

  updateItemsInView();
};

const updateItemsInView = () => {
  if (!listRef.value) return;

  const container = listRef.value;
  const containerRect = container.getBoundingClientRect();

  itemsInView.value = props.items.map((_, index) => {
    const item = container.querySelector(`[data-index="${index}"]`) as HTMLElement;
    if (!item) return false;

    const itemRect = item.getBoundingClientRect();
    const viewHeight = containerRect.height;
    const itemTop = itemRect.top - containerRect.top;
    const itemBottom = itemTop + itemRect.height;

    return itemTop < viewHeight && itemBottom > 0;
  });
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
    e.preventDefault();
    keyboardNav.value = true;
    setSelectedIndex(Math.min(selectedIndex.value + 1, props.items.length - 1));
  } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
    e.preventDefault();
    keyboardNav.value = true;
    setSelectedIndex(Math.max(selectedIndex.value - 1, 0));
  } else if (e.key === 'Enter') {
    if (selectedIndex.value >= 0 && selectedIndex.value < props.items.length) {
      e.preventDefault();
      emit('itemSelected', props.items[selectedIndex.value], selectedIndex.value);
    }
  }
};

watch([selectedIndex, keyboardNav], () => {
  if (!keyboardNav.value || selectedIndex.value < 0 || !listRef.value) return;
  const container = listRef.value;
  const selectedItem = container.querySelector(`[data-index="${selectedIndex.value}"]`) as HTMLElement | null;
  if (selectedItem) {
    const extraMargin = 50;
    const containerScrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const itemTop = selectedItem.offsetTop;
    const itemBottom = itemTop + selectedItem.offsetHeight;
    if (itemTop < containerScrollTop + extraMargin) {
      container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
    } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
      container.scrollTo({
        top: itemBottom - containerHeight + extraMargin,
        behavior: 'smooth'
      });
    }
  }
  keyboardNav.value = false;
});

onMounted(() => {
  if (props.enableArrowNavigation) {
    window.addEventListener('keydown', handleKeyDown);
  }

  itemsInView.value = new Array(props.items.length).fill(true);
  setTimeout(updateItemsInView, 100);
});

onUnmounted(() => {
  if (props.enableArrowNavigation) {
    window.removeEventListener('keydown', handleKeyDown);
  }
});
</script>
