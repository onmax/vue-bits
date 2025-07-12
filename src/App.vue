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

const isCategoryPage = computed(() => /^\/[^/]+\/[^/]+$/.test(route.path));

const activeItem = computed(() => {
  if (route.path === '/') return 'home';
  return null;
});
</script>
