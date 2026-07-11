<template>
  <header class="site-header">

    <h1 class="site-header__title">Curated</h1>
    
    <UiButton 
      :data-theme="theme" 
      @click="handleThemeClick" 
      alt="Change Theme">
      <IconTheme role="presentational" />
    </UiButton>

  </header>
</template>

<script setup>
import { useTheme } from '@/hooks/use-theme'
import UiButton from '@/components/ui-button.vue'
import IconTheme from '@/icons/icon-theme.vue'

const { theme, setTheme } = useTheme()

function handleThemeClick (e) {
  setTheme()
}
</script>

<style>
.site-header {
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  gap: 0.5rem;
}

.site-header__title {
  font-weight: 600;
  font-family: var(--ff-display);
  font-size: 2rem;
  letter-spacing: 0.05ch;
  text-transform: uppercase;
  transition: font-size 0.25s ease-out;

  @media (min-width: 30rem) {
    font-size: 3rem;
  }
  
  @media (min-width: 50rem) {
    font-size: 4rem;
  }
}

.site-header__social-link {
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
</style>