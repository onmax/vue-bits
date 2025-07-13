<template>
  <div
    class="relative"
    :style="{ width: cardDimensions.width + 'px', height: cardDimensions.height + 'px', perspective: 600 }"
  >
    <template v-for="(card, index) in cards" :key="card.id">
      <CardRotate :sensitivity="sensitivity" @send-to-back="sendToBack(card.id)">
        <Motion
          as="div"
          class="rounded-2xl overflow-hidden border-4 border-white"
          @click="sendToBackOnClick && sendToBack(card.id)"
          :animate="{
            rotateZ: (cards.length - index - 1) * 4 + (randomRotation ? Math.random() * 10 - 5 : 0),
            scale: 1 + index * 0.06 - cards.length * 0.06,
            transformOrigin: '90% 90%'
          }"
          :initial="false"
          :transition="{
            type: 'spring',
            stiffness: animationConfig.stiffness,
            damping: animationConfig.damping
          }"
          :style="{
            width: cardDimensions.width + 'px',
            height: cardDimensions.height + 'px'
          }"
        >
          <img :src="card.img" :alt="`card-${card.id}`" className="w-full h-full object-cover pointer-events-none" />
        </Motion>
      </CardRotate>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v';
import { ref } from 'vue';
import CardRotate from './CardRotate.vue';

interface StackProps {
  className?: string;
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  cardsData: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
}

const props = withDefaults(defineProps<StackProps>(), {
  randomRotation: false,
  sensitivity: 200,
  cardDimensions: () => ({ width: 208, height: 208 }),
  cardsData: () => [],
  animationConfig: () => ({ stiffness: 260, damping: 20 }),
  sendToBackOnClick: false
});

const cards = ref(
  props.cardsData.length
    ? props.cardsData
    : [
        { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format' },
        { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format' },
        { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format' },
        { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format' }
      ]
);

const sendToBack = (id: number) => {
  const newCards = [...cards.value];
  const index = newCards.findIndex(card => card.id === id);
  const [card] = newCards.splice(index, 1);
  newCards.unshift(card);
  cards.value = newCards;
};
</script>
