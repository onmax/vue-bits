<template>
  <Motion
    as="div"
    class="absolute cursor-grab"
    :style="{ x, y, rotateX, rotateY }"
    drag
    :drag-constraints="{ top: 0, right: 0, bottom: 0, left: 0 }"
    :dragElastic="0.6"
    :whileTap="{ cursor: 'grabbing' }"
    :onDragEnd="handleDragEnd"
  >
    <slot />
  </Motion>
</template>

<script lang="ts" setup>
import type { PanInfo } from 'motion-v';
import { Motion, useMotionValue, useTransform } from 'motion-v';

interface CardRotateProps {
  sensitivity: number;
}
const { sensitivity } = defineProps<CardRotateProps>();
const emits = defineEmits<{
  (e: 'sendToBack'): void;
}>();

const x = useMotionValue(0);
const y = useMotionValue(0);
const rotateX = useTransform(y, [-100, 100], [60, -60]);
const rotateY = useTransform(x, [-100, 100], [-60, 60]);

function handleDragEnd(_: PointerEvent, info: PanInfo) {
  if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
    emits('sendToBack');
  } else {
    x.set(0);
    y.set(0);
  }
}
</script>
