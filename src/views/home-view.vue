<template>
  <main class="home">
    <SiteHeader />
    <div class="home__grid" v-if="posts">
      <preview-card v-for="post in posts" :key="post.slug" class="home__card" :post />
    </div>
  </main>
</template>

<script setup>
import PreviewCard from '@/components/preview-card.vue'
import SiteHeader from '@/components/site-header.vue'

import { useTheme } from '@/hooks/use-theme.js'

const { theme } = useTheme()

defineProps({
  posts: { type: Array }
})
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  max-width: 80rem;
  min-height: 100dvh;
  padding: 1rem;
}

.home__grid {
  display: flex;
  flex-flow: row wrap;
  /* margin-inline: -1rem; */
  gap: 1rem 0.5rem;
  justify-content: space-evenly;
}

.home__card {
  height: 70dvh;
  max-width: 400px;
  align-self: flex-start;
}
</style>