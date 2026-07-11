<template>
  <a :href="`/post/${post.slug}/`" class="preview-card">
    <CuratedImage class="preview-card__image" :src="post.image" preset="thumb" />
  </a>
</template>

<script setup>
import CuratedImage from '@/components/curated-image.vue';

const { post } = defineProps({
  post: { type: Object, required: true }
})
</script>

<style>
.preview-card {
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  text-decoration: none;
}

.preview-card__image {
  border-radius: 0.5rem;
  contain: layout;
  max-height: 100%;
  min-height: 100%;
  object-fit: contain;
  view-transition-name: art-image;
}
</style>