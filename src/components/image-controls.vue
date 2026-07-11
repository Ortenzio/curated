<template>
  <div class="image-controls">
    <UiSlider @input="handleUpdate" v-model="modelValue.saturation" :min="0" :max="3" :step="0.05" label="Saturation" :format />
    <UiSlider @input="handleUpdate" v-model="modelValue.contrast" :min="0.5" :max="3" :step="0.05" label="Contrast" :format />
    <UiSlider @input="handleUpdate" v-model="modelValue.brightness" :min="0.5" :max="3" :step="0.05" label="Brightness" :format />
    <UiSlider @input="handleUpdate" v-model="modelValue.blur" :min="0" :max="3" :step="0.01" label="Squint" :format/>
  </div>
</template>

<script setup>
import UiSlider from '@/components/ui-slider.vue';

const props = defineProps({
  modelValue: { type: Object, required: true }
})

const emits = defineEmits(['update:modelValue'])

const format = (d) => d.toFixed(1);

function handleUpdate (e) {
  props.modelValue.hasAdjusted = true;
  emits("update:modelValue", props.modelValue)
}
</script>

<style>
.image-controls {
  border-left: 0.25rem solid var(--color-text);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1rem;
}
</style>