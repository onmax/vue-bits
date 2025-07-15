<template>
  <div class="landing-content">
    <div class="hero-main-content">
      <h1 class="landing-title">
        <ResponsiveSplitText
          :is-mobile="isMobile"
          text="Animated Vue components"
          class-name="hero-split"
          split-type="chars"
          :delay="30"
          :duration="2"
          ease="elastic.out(0.5, 0.3)"
        />

        <br />

        <ResponsiveSplitText
          :is-mobile="isMobile"
          text="for creative developers"
          class-name="hero-split"
          split-type="chars"
          :delay="30"
          :duration="2"
          ease="elastic.out(0.5, 0.3)"
        />
      </h1>

      <ResponsiveSplitText
        :is-mobile="isMobile"
        class-name="landing-subtitle"
        split-type="words"
        :delay="10"
        :duration="1"
        text="Sixty-plus snippets, ready to be dropped into your Vue projects"
      />

      <router-link to="/text-animations/split-text" class="landing-button">
        <span>Browse Components</span>

        <div class="button-arrow-circle">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="#0b0b0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </router-link>
    </div>

    <div v-if="!isMobile" class="hero-cards-container">
      <div class="hero-card hero-card-1" @click="openUrl('https://vue-bits.dev/backgrounds/dot-grid')">
        <div class="w-full h-full relative hero-dot-grid">
          <DotGrid
            base-color="#ffffff"
            active-color="rgba(138, 43, 226, 0.9)"
            :dot-size="8"
            :gap="16"
            :proximity="50"
          />

          <div class="placeholder-card"></div>
        </div>
      </div>

      <div class="hero-cards-row">
        <div class="hero-card hero-card-2" @click="openUrl('https://vue-bits.dev/backgrounds/letter-glitch')">
          <LetterGlitch class-name="hero-glitch" :glitch-colors="['#ffffff', '#999999', '#333333']" />

          <div class="placeholder-card"></div>
        </div>

        <div class="hero-card hero-card-3" @click="openUrl('https://vue-bits.dev/backgrounds/squares')">
          <Squares border-color="#fff" :speed="0.2" direction="diagonal" hover-fill-color="#fff" />

          <div class="placeholder-card"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, h, defineComponent } from 'vue';
import DotGrid from '@/content/Backgrounds/DotGrid/DotGrid.vue';
import SplitText from '@/content/TextAnimations/SplitText/SplitText.vue';
import LetterGlitch from '@/content/Backgrounds/LetterGlitch/LetterGlitch.vue';
import Squares from '@/content/Backgrounds/Squares/Squares.vue';

const ResponsiveSplitText = defineComponent({
  props: {
    isMobile: { type: Boolean, required: true },
    text: { type: String, required: true },
    className: { type: String, default: '' },
    splitType: { type: String as () => 'chars' | 'words' | 'lines' | 'words, chars', default: 'chars' },
    delay: { type: Number, default: 100 },
    duration: { type: Number, default: 0.6 },
    ease: { type: String, default: 'power3.out' },
    from: { type: Object, default: () => ({ opacity: 0, y: 40 }) },
    to: { type: Object, default: () => ({ opacity: 1, y: 0 }) },
    threshold: { type: Number, default: 0.1 },
    rootMargin: { type: String, default: '-100px' },
    textAlign: { type: String as () => 'left' | 'center' | 'right' | 'justify', default: 'center' },
    onLetterAnimationComplete: { type: Function, default: undefined }
  },
  render() {
    if (this.isMobile) {
      return h('span', { class: this.className }, this.text);
    } else {
      return h(SplitText, {
        text: this.text,
        className: this.className,
        splitType: this.splitType,
        delay: this.delay,
        duration: this.duration,
        ease: this.ease,
        from: this.from,
        to: this.to,
        threshold: this.threshold,
        rootMargin: this.rootMargin,
        textAlign: this.textAlign,
        onLetterAnimationComplete: this.onLetterAnimationComplete as (() => void) | undefined
      });
    }
  }
});

const openUrl = (url: string) => {
  window.open(url);
};

const isMobile = ref(false);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile);
});
</script>

<style scoped>
.placeholder-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
