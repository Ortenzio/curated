<template>
  <div class="ui-slider">
    <label class="ui-slider__label" v-if="props.label">{{ props.label }}:</label>
    <span class="ui-slider__value">{{ props.format(modelValue) }}</span>
    <input 
      class="ui-slider__input" 
      type="range" 
      :min="props.min" 
      :max="props.max" 
      :step="props.step" 
      :value="modelValue"
      @input="handleInput" />
  </div>
</template>

<script setup>
const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: [Number, String], required: false, default: 'any' },
  label: { type: String },
  format: { type: Function, default: (d) => d },
  modelValue: { type: Number, required: true, default: 0 }
})

const emits = defineEmits(['update:modelValue'])

function handleInput (e) {
  emits('update:modelValue', Number(e.target.value))
}
</script>

<style>
.ui-slider {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
  gap: 0.5rem;
  line-height: 1.5;
  position: relative;
}

.ui-slider__label {
  flex-shrink: 0;
  font-weight: 600;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  width: 5rem;
}

.ui-slider__value {
  flex-shrink: 0;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  width: 3rem;
}

.ui-slider__input {
  appearance: none;
  background-color: var(--color-text);
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  flex-grow: 1;
  height: 0.5rem;
  max-width: 15rem;
  outline: none;
  position: relative;
  width: 100%;

  &::-webkit-slider-thumb {
    appearance: none;
    background: var(--color-text);
    border-radius: 1rem;
    border: 0.125rem solid var(--color-background);
    cursor: pointer;
    height: 1rem;
    width: 1rem;
  }
}
</style>