<template>
  <div ref="scrollRef">
    <div class="page-transition-fade">
      <h2 class="sub-category">{{ decodedLabel }}</h2>

      <Suspense>
        <template #default>
          <component :is="SubcategoryComponent" v-if="SubcategoryComponent" />
        </template>
        <template #fallback>
          <div class="loading-placeholder">Loading...</div>
        </template>
      </Suspense>
    </div>

    <BackToTopButton />
  </div>
</template>

  <script setup lang="ts">
  import { ref, computed, watch, onMounted, nextTick, defineAsyncComponent } from 'vue'
  import { useRoute } from 'vue-router'
  import { componentMap } from '../constants/Components'
  import { decodeLabel } from '../utils/utils'
  import BackToTopButton from '@/components/common/BackToTopButton.vue'
  import '../css/category.css'

  const route = useRoute()
  const scrollRef = ref<HTMLDivElement | null>(null)

  const subcategory = computed(() => route.params.subcategory as string)
  const decodedLabel = computed(() => decodeLabel(subcategory.value))

  // Lazy load the component based on subcategory
  const SubcategoryComponent = computed(() => {
    if (!subcategory.value) {
      return null
    }

    const componentLoader = componentMap[subcategory.value as keyof typeof componentMap]

    if (!componentLoader) {
      return null
    }

    return defineAsyncComponent(componentLoader)
  })

  // Update document title
  watch(decodedLabel, (newLabel) => {
    if (newLabel) {
      document.title = `Vue Bits - ${newLabel}`
    }
  }, { immediate: true })

  // Scroll to top when subcategory changes
  watch(subcategory, async () => {
    if (scrollRef.value) {
      await nextTick()
      scrollRef.value.scrollTo(0, 0)
    }
  })

  onMounted(() => {
    // Initial scroll to top
    if (scrollRef.value) {
      scrollRef.value.scrollTo(0, 0)
    }
  })
</script>