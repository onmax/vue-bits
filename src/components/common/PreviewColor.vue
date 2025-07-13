<template>
  <div class="preview-color">
    <span class="color-label">{{ title }}</span>
    <input :value="modelValue" @input="handleColorChange" type="color" :disabled="disabled" class="color-input" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  modelValue: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleColorChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.preview-color {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.color-label {
  font-size: 0.875rem;
  white-space: nowrap;
}

.color-input {
  width: 50px;
  height: 32px;
  border: 1px solid #333;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
}

.color-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-input::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}
</style>
