<template>
  <button class="ui-button"><slot /></button>
</template>

<style>
.ui-button {
  align-items: center;
  background-color: var(--color-background);
  border-radius: 2px;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  font-weight: 600;
  gap: 0.5rem;
  padding: 0.325rem 0.5rem;
  transition: background-color 0.25s ease-out;
  white-space: nowrap;
}

.ui-button[data-toggled="true"] {
  background-color: var(--color-text);
  color: var(--color-background);
}
</style>