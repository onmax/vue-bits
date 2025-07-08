<template>
  <section class="landing-wrapper">
    <div v-if="isMobile" class="mobile-hero-background-container">
      <!-- Hero image will be added when available -->
    </div>

    <PlasmaWave :y-offset="-300" :x-offset="100" :rotation-deg="-30" />
    <Hero />
    <FeatureCards />
    <StartBuilding />
    <Footer />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Hero from '../components/landing/Hero/Hero.vue'
import PlasmaWave from '@/components/landing/PlasmaWave/PlasmaWave.vue'
import Footer from '@/components/landing/Footer/Footer.vue'
import FeatureCards from '@/components/landing/FeatureCards/FeatureCards.vue'
import StartBuilding from '@/components/landing/StartBuilding/StartBuilding.vue'
const isMobile = ref(false)

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  document.title = 'Vue Bits - Animated UI Components For Vue'
  window.scrollTo(0, 0)
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile)
})
</script>
