<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
}

const props = withDefaults(defineProps<CurvedLoopProps>(), {
  marqueeText: '',
  speed: 2,
  className: '',
  curveAmount: 400,
  direction: 'left',
  interactive: true
});

const text = computed(() => {
  const hasTrailing = /\s|\u00A0$/.test(props.marqueeText);
  return (hasTrailing ? props.marqueeText.replace(/\s+$/, '') : props.marqueeText) + '\u00A0';
});

const measureRef = ref<SVGTextElement | null>(null);
const tspansRef = ref<SVGTSpanElement[]>([]);
const pathRef = ref<SVGPathElement | null>(null);
const pathLength = ref(0);
const spacing = ref(0);
const uid = Math.random().toString(36).substr(2, 9);
const pathId = `curve-${uid}`;

const pathD = computed(() => `M-100,40 Q500,${40 + props.curveAmount} 1540,40`);

const dragRef = ref(false);
const lastXRef = ref(0);
const dirRef = ref<'left' | 'right'>(props.direction);
const velRef = ref(0);

let animationFrame: number | null = null;

const updateSpacing = () => {
  if (measureRef.value) {
    spacing.value = measureRef.value.getComputedTextLength();
  }
};

const updatePathLength = () => {
  if (pathRef.value) {
    pathLength.value = pathRef.value.getTotalLength();
  }
};

const animate = () => {
  if (!spacing.value) return;

  const step = () => {
    tspansRef.value.forEach(t => {
      if (!t) return;
      let x = parseFloat(t.getAttribute('x') || '0');
      if (!dragRef.value) {
        const delta = dirRef.value === 'right' ? Math.abs(props.speed) : -Math.abs(props.speed);
        x += delta;
      }
      const maxX = (tspansRef.value.length - 1) * spacing.value;
      if (x < -spacing.value) x = maxX;
      if (x > maxX) x = -spacing.value;
      t.setAttribute('x', x.toString());
    });
    animationFrame = requestAnimationFrame(step);
  };
  step();
};

const stopAnimation = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
};

const repeats = computed(() => {
  return pathLength.value && spacing.value ? Math.ceil(pathLength.value / spacing.value) + 2 : 0;
});

const ready = computed(() => pathLength.value > 0 && spacing.value > 0);

const onPointerDown = (e: PointerEvent) => {
  if (!props.interactive) return;
  dragRef.value = true;
  lastXRef.value = e.clientX;
  velRef.value = 0;
  (e.target as HTMLElement).setPointerCapture(e.pointerId);
};

const onPointerMove = (e: PointerEvent) => {
  if (!props.interactive || !dragRef.value) return;
  const dx = e.clientX - lastXRef.value;
  lastXRef.value = e.clientX;
  velRef.value = dx;
  tspansRef.value.forEach(t => {
    if (!t) return;
    let x = parseFloat(t.getAttribute('x') || '0');
    x += dx;
    const maxX = (tspansRef.value.length - 1) * spacing.value;
    if (x < -spacing.value) x = maxX;
    if (x > maxX) x = -spacing.value;
    t.setAttribute('x', x.toString());
  });
};

const endDrag = () => {
  if (!props.interactive) return;
  dragRef.value = false;
  dirRef.value = velRef.value > 0 ? 'right' : 'left';
};

const cursorStyle = computed(() => {
  return props.interactive ? (dragRef.value ? 'grabbing' : 'grab') : 'auto';
});

onMounted(() => {
  nextTick(() => {
    updateSpacing();
    updatePathLength();
    animate();
  });
});

onUnmounted(() => {
  stopAnimation();
});

watch([text, () => props.className], () => {
  nextTick(() => {
    updateSpacing();
  });
});

watch(
  () => props.curveAmount,
  () => {
    nextTick(() => {
      updatePathLength();
    });
  }
);

watch([spacing, () => props.speed], () => {
  stopAnimation();
  if (spacing.value) {
    animate();
  }
});

watch(repeats, () => {
  tspansRef.value = [];
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center w-full"
    :style="{
      visibility: ready ? 'visible' : 'hidden',
      cursor: cursorStyle
    }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="endDrag"
    @pointerleave="endDrag"
  >
    <svg
      class="select-none w-full overflow-visible block aspect-[100/12] text-[6rem] font-bold tracking-[5px] uppercase leading-none"
      viewBox="0 0 1440 120"
    >
      <text ref="measureRef" xml:space="preserve" style="visibility: hidden; opacity: 0; pointer-events: none">
        {{ text }}
      </text>

      <defs>
        <path ref="pathRef" :id="pathId" :d="pathD" fill="none" stroke="transparent" />
      </defs>

      <text v-if="ready" xml:space="preserve" :class="`fill-white ${className}`">
        <textPath :href="`#${pathId}`" xml:space="preserve">
          <tspan
            v-for="i in repeats"
            :key="i"
            :x="(i - 1) * spacing"
            :ref="
              el => {
                if (el) tspansRef[i - 1] = el as SVGTSpanElement;
              }
            "
          >
            {{ text }}
          </tspan>
        </textPath>
      </text>
    </svg>
  </div>
</template>
