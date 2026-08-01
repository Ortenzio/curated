<template>
  <div class="artist">
    <main class="artist__posts">
      <a 
        v-for="post in data.results" 
        :id="`post__${post.slug}`" 
        :href="`/post/${post.slug}/`" 
        class="artist__post-link"
        :aria-label="title"
      >
        <nuxt-img 
          class="artist__post-image" 
          :src="post.image" 
          preset="thumb" 
          loading="lazy"
          :aria-labelledby="`post__${post.slug}`"
        />
      </a>
    </main>
  </div>
</template>

<script setup>
import { useRoute, useFetch, useSeoMeta } from '#app';

const route = useRoute()
const { slug } = route.params;
const { data } = useFetch(() => `/api/artist/${slug}`)

useSeoMeta({
  title: () => `${data.value.name} - Curated`
})

</script>

<style>
.artist {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.125rem;

  @media (min-width: 30rem) {
    padding: 1rem 1rem 2rem;
  }
}

.artist__posts {
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;

  @media (min-width: 30rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 40rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 50rem) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 60rem) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.artist__post-link {
  display: flex;
  flex-flow: column nowrap;
  place-content: center;
  text-decoration: none;
}

.artist__post-image {
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.125rem;
}
</style>