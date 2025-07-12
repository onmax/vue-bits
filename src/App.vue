<template>
  <div>
    <DisplayHeader v-if="!isCategoryPage" :activeItem="activeItem" />

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DisplayHeader from '@/components/landing/DisplayHeader/DisplayHeader.vue';

const route = useRoute();

const activeItem = computed(() => {
  if (route.path === '/') return 'home';
  return null;
});

const isCategoryPage = computed(() => {
  return /^\/[^/]+\/[^/]+$/.test(route.path);
});
</script>
