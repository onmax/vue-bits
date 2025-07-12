<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { gsap } from "gsap";

interface GridMotionProps {
  items?: string[];
  gradientColor?: string;
}

const props = withDefaults(defineProps<GridMotionProps>(), {
  items: () => [],
  gradientColor: "black",
});

const gridRef = ref<HTMLElement | null>(null);
const rowRefs = ref<HTMLElement[]>([]);
const mouseX = ref(window.innerWidth / 2);

const totalItems = 28;
const defaultItems = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);
const combinedItems = computed(() =>
  props.items.length > 0 ? props.items.slice(0, totalItems) : defaultItems,
);

function isImage(item: string) {
  return typeof item === "string" && item.startsWith("http");
}

function isTag(item: string) {
  return typeof item === "string" && item.startsWith("<") && item.endsWith(">");
}

onMounted(() => {
  gsap.ticker.lagSmoothing(0);

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.value = e.clientX;
  };

  const updateMotion = () => {
    const maxMoveAmount = 300;
    const baseDuration = 0.8;
    const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

    rowRefs.value.forEach((row, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const moveAmount =
        ((mouseX.value / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;

      gsap.to(row, {
        x: moveAmount,
        duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  };

  const removeAnimation = gsap.ticker.add(updateMotion);
  window.addEventListener("mousemove", handleMouseMove);

  onBeforeUnmount(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    removeAnimation();
  });
});
</script>

<template>
  <div ref="gridRef" class="w-full h-full overflow-hidden">
    <section
      class="relative flex justify-center items-center w-full h-screen overflow-hidden"
      :style="{
        background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
      }"
    >
      <div class="z-[4] absolute inset-0 bg-[length:250px] pointer-events-none"></div>

      <div
        class="z-[2] relative flex-none gap-4 grid grid-cols-1 grid-rows-4 w-[150vw] h-[150vh] rotate-[-15deg] origin-center"
      >
        <div
          v-for="rowIndex in 4"
          :key="rowIndex"
          class="gap-4 grid grid-cols-7"
          :style="{ willChange: 'transform, filter' }"
          ref="rowRefs"
        >
          <div v-for="itemIndex in 7" :key="itemIndex" class="relative">
            <div
              class="relative flex justify-center items-center bg-[#111] rounded-[10px] w-full h-full overflow-hidden text-[1.5rem] text-white"
            >
              <div
                v-if="isImage(combinedItems[(rowIndex - 1) * 7 + (itemIndex - 1)])"
                class="top-0 left-0 absolute bg-cover bg-center w-full h-full"
                :style="{
                  backgroundImage: `url(${combinedItems[(rowIndex - 1) * 7 + (itemIndex - 1)]})`,
                }"
              ></div>
              <div
                v-else-if="isTag(combinedItems[(rowIndex - 1) * 7 + (itemIndex - 1)])"
                class="z-[2] p-4 text-center"
                v-html="combinedItems[(rowIndex - 1) * 7 + (itemIndex - 1)]"
              ></div>
              <div v-else class="z-[1] p-4 text-center">
                {{ combinedItems[(rowIndex - 1) * 7 + (itemIndex - 1)] }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="top-0 left-0 relative w-full h-full pointer-events-none"></div>
    </section>
  </div>
</template>
