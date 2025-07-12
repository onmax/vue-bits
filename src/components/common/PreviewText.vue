<template>
  <div class="preview-text">
    <span class="text-label">{{ title }}</span>

    <input
      :value="modelValue"
      @input="handleChange"
      class="w-[300px] px-3 py-2 bg-[#0b0b0b] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#666]"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);
defineProps<{
  title: string;
  modelValue: string;
}>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.preview-text {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
}
</style>
