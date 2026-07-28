<template>
  <main class="post">

    <div class="post__canvas">
      <curated-image>
        <nuxt-img 
          :src="post.image" 
          :preload="{ fetchPriority: 'high' }"
          class="post__image"
          format="webp"
          quality="80" 
          loading="lazy" 
        />
      </curated-image>
    </div>

    <div class="post__info">

      <div class="post__title">{{ post.title }}</div>
      
      <div class="post__details">
        <UiDefinition term="Artist">{{ post.artist}}</UiDefinition>
        <UiDefinition v-if="post.medium" term="Medium">{{ post.medium }}</UiDefinition>
        <UiDefinition v-if="post.support" term="Support">{{ post.support }}</UiDefinition>
        <UiDefinition v-if="post.height && post.width" term="Dimensions">{{ sizeFormat(post.height) }} × {{ sizeFormat(post.width) }} <span class="post__unit">cm</span></UiDefinition>
        <UiDefinition v-if="post.date" term="Date">{{ post.date }}</UiDefinition>
        <UiDefinition v-if="post.source" term="Source"><a :href="post.source" class="post__ext-link" target="_blank" rel="noopener noreferrer">{{ post.location }}</a></UiDefinition>
      </div>

      <a :href="`/post/${post.prev.slug}`" rel="prev" class="post__nav">
        <nuxt-img class="post__nav-image" :src="post.prev.image" :width="600" densities="1x" format="webp" quality="60" loading="lazy" />
      </a>

      <a :href="`/post/${post.next.slug}`" rel="next" class="post__nav">
        <nuxt-img class="post__nav-image" :src="post.next.image" :width="600" densities="1x" format="webp" quality="60" loading="lazy" />
      </a>

      <div class="post__footer">
        <a href="/" class="post__home">Curated</a>
        <curated-theme-toggle />
      </div>

    </div>


  </main>
</template>

<script setup>
import { useRoute, useFetch, useHead } from '#app';
import UiDefinition from '~/components/ui-definition.vue';
import speculationRules from '~/data/speculation-rules.json'

const route = useRoute()
const { slug } = route.params;
const { data: post } = useFetch(() => `/api/post/${slug}`)

const sizeFormat = (d) => d.toFixed(1)

useHead({
  title: () => `${post.value.title} - Curated`,
  meta: () => [
    { property: 'og:url', content: `/post/${post.value.slug}` },
    { property: 'og:title', content: post.value.title },
    { property: 'og:image', content: `/_ipx/f_webp&q_80/${post.value.image}` },
    { name: 'description', content: `Painting: ${post.value.title} by the Artist, ${post.value.artist}`}
  ],
  script: () => [
    { type: 'speculationrules', textContent: JSON.stringify(speculationRules)}
  ]
})
</script>

<style>
.post {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  position: relative;
}

.post__canvas {
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  min-height: calc(100dvh - 4rem);
  padding-top: 1rem;
}

.post__image {
  border-radius: 0.5rem;
  box-shadow: 0 0 5px rgba(0,0,0,0.35);
  contain: layout;
  max-height: calc(100dvh - 4rem);
  max-width: 100%;
  object-fit: contain;
  view-transition-name: art-image;
}

.post__info {
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(1, 1fr);
  position: relative;
  width: 100%;

  @media (min-width: 30rem) {
    grid-template-columns: 1fr 20rem 20rem;
  }
}


.post__details {
  background-color: var(--c-canvas);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  text-transform: capitalize;

  @media (min-width: 30rem) {
    font-size: 1rem;
  }
}

.post__nav {
  background-color: var(--c-canvas);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  filter: saturate(0);
  transition: filter 0.25s ease-in-out;
  &:hover {
    filter: saturate(1);    
  }
}

.post__nav-image {
  height: 100%;
  max-height: 30dvh;
  object-fit: cover;
  width: 100%;
}

.post__footer { 
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: baseline;
  background-color: var(--c-canvas);
  padding: 1rem;
  gap: 0.5rem;
  grid-column: span 3 / span 3;
  grid-row-start: 3;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.post__title {
  background-color: var(--c-canvas);
  font-family: var(--ff-title);
  font-size: 1.25rem;
  font-weight: 500;
  grid-column: span 3 / span 3;
  grid-row-start: 1;
  padding: 1rem;
  text-wrap: balance;

  @media (min-width: 50rem) {
    font-size: 1.5rem;
  }
}

.post__unit {
  text-transform: lowercase;
}

.post__home {
  font-family: var(--ff-title);
  font-size: 1.5rem;
}
</style>
