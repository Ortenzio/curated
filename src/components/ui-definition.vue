<template>
  <dl class="ui-definition">
    <dt>{{ props.term }}:</dt>
    <dd><slot /></dd>
  </dl>
</template>

<script setup>
const props = defineProps({
  term: { type: String, default: '' },
})
</script>

<style>
.ui-definition {
  display: flex;
  flex-direction: row nowrap;
  gap: 0.5rem;
  align-items: center;

  & dt {
    font-weight: 600;
  }

  & dd {
    font-weight: 400;
  }
}
</style>