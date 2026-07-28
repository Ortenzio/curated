<template>
  <div class="app">
    <header class="app__header">
      <a class="app__title" href="/">Curated</a>
      <curated-theme-toggle />
    </header>
    <main class="app__posts">
      <a class="app__post-link" v-for="post in posts" :href="`/post/${post.slug}/`">
        <nuxt-img class="app__post-image" :src="post.image" :width="600" densities="1x" format="webp" quality="60" loading="lazy" />
      </a>
    </main>
  </div>
</template>

<script setup>
import { useFetch, useHead } from '#app';
const { data: posts } = useFetch('/api/posts')

useHead({
  title: 'Curated',
})
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1rem 2rem;
}

.app__posts {
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;

  @media (min-width: 30rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 40rem) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 60rem) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.app__post-link {
  display: flex;
  flex-flow: column nowrap;
  place-content: center;
  text-decoration: none;
}

.app__post-image {
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.125rem;
}

.app__header {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  gap: 1rem;
}

.app__title {
  font-family: var(--ff-title);
  font-size: 3.5rem;
  font-weight: 400;
  line-height: .9; 
  color: var(--c-text);
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
}

</style>