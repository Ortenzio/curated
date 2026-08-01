<template>
  <main class="post">

    <div class="post__canvas">
      <nuxt-img 
        :src="post.image" 
        :preload="{ fetchPriority: 'high' }"
        :style="{ 'view-transition-name': post.slug }"
        class="post__image"
        preset="full"
      />
    </div>

    <div id="post__info" class="post__info">

      <div class="post__title">
        <div class="post__inner">{{ post.title }}</div>
      </div>
      
      <div class="post__details">
        <div class="post__inner">
          <UiDefinition term="Artist" :def="post.artist" />
          <UiDefinition v-if="post.medium" term="Medium" :def="post.medium" />
          <UiDefinition v-if="post.support" term="Support" :def="post.support" />
          <UiDefinition v-if="post.height && post.width" term="Dimensions">{{ sizeFormat(post.height) }} × {{ sizeFormat(post.width) }} <span class="post__unit">cm</span></UiDefinition>
          <UiDefinition v-if="post.date" term="Date" :def="post.date" />
          <UiDefinition v-if="post.source" term="Source"><a :href="post.source" class="post__ext-link" target="_blank" rel="noopener noreferrer">{{ post.location }}</a></UiDefinition>
        </div>
      </div>

      <div class="post__footer">
        <div class="post__inner">
          <a href="/" class="post__home">Curated</a>
          <curated-theme-toggle />
        </div>
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
    { property: 'og:image', content: `/_ipx/full${post.value.image}` },
    { name: 'description', content: `Painting: ${post.value.title} by the Artist, ${post.value.artist}`}
  ],
  script: () => [
    { type: 'speculationrules', textContent: JSON.stringify(speculationRules)}
  ]
})
</script>


<style src="~/styles/views/post.css" />

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
}

.post__inner {
  max-width: 40rem;
  width: 100%;
  margin-inline: auto;
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
}

.post__nav-image {
  height: 100%;
  max-height: 13rem;
  object-fit: cover;
  width: 100%;
  mix-blend-mode: normal;
  transition: filter 0.25s ease-in-out, mix-blend-mode 0.25s ease-in-out;
  filter: saturate(0);
  &:hover {
    filter: saturate(1);
    mix-blend-mode: normal;
  }
}

.post__title {
  background-color: var(--c-canvas);
  font-family: var(--ff-title);
  font-size: 1.125rem;
  font-weight: 500;
  grid-row-start: 1;
  padding: 1rem;
  text-wrap: balance;

  @media (min-width: 40rem) {
    font-size: 1.25rem;
  }

  @media (min-width: 50rem) {
    font-size: 1.5rem;
  }
}

.post__unit {
  text-transform: lowercase;
}

.post__footer {
  background-color: var(--c-canvas);
  padding: 0.5rem 1rem;
}

.post__footer .post__inner { 
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;

  @media (min-width: 40rem) {
    justify-content: flex-start;
  } 
}

.post__home {
  font-family: var(--ff-title);
  font-size: 1rem;

  @media (min-width: 40rem) {
    font-size: 1.125rem;
  }

  @media (min-width: 50rem) {
    font-size: 1.25rem;
  }
}
</style>
