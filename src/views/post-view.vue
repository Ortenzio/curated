<template>
  <main class="post">

    <div class="post__image-container" :style="{ filter: `saturate(${adj.saturation}) contrast(${adj.contrast}) brightness(${adj.brightness}) blur(${adj.blur}px)`}">
      <CuratedImage class="post__image" :src="post.image" preset="full" />
    </div>

    <div class="post__info">

      <div class="post__nav">
        <a href="/" class="post__link" data-dir="up" title="Home Page"><IconArrow alt="Home Page" /></a>
        <a v-if="post.prev" :href="`/post/${post.prev}/`" rel="prev" class="post__link" data-dir="left" title="Previous Post"><IconArrow alt="Previous Post"/></a>
        <a v-if="post.next" :href="`/post/${post.next}/`" rel="next" class="post__link" data-dir="right" title="Next Post"><IconArrow alt="Next Post"/></a>
      </div>

      <div class="post__title">
        {{ post.title }}
      </div>

      <div class="post__buttons">
        <UiButton @click="handleDetails" :data-toggled="showDetails"><icon-info /> Details</UiButton>
      </div>

      <div class="post__details" v-show="showDetails">
        <UiDefinition term="Artist">{{ post.artist}}</UiDefinition>
        <UiDefinition term="Medium">{{ post.medium }}</UiDefinition>
        <UiDefinition term="Support">{{ post.support }}</UiDefinition>
        <UiDefinition term="Dimensions">{{ sizeFormat(post.height) }} × {{ sizeFormat(post.width) }} <span class="post__unit">cm</span></UiDefinition>
        <UiDefinition term="Date">{{ post.date }}</UiDefinition>
        <UiDefinition term="Source"><a :href="post.source" class="post__ext-link" target="_blank" rel="noopener noreferrer">{{ post.location }}</a></UiDefinition>
      </div>

      <div class="post__buttons">
        <UiButton @click="handleAdjust" :data-toggled="showAdjust"><icon-adjust /> Adjust</UiButton>
        <UiButton @click="handleReset" v-if="adj.hasAdjusted"><icon-reset /> Reset</UiButton>
      </div>

      <ImageControls class="post__image-controls" v-model="adj" v-show="showAdjust" />
    </div>

  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'

import { useTheme } from '@/hooks/use-theme.js'

import CuratedImage from '@/components/curated-image.vue'
import ImageControls from '@/components/image-controls.vue'
import UiButton from '@/components/ui-button.vue'
import UiDefinition from '@/components/ui-definition.vue';

import IconArrow from '@/icons/icon-arrow.vue'
import IconAdjust from '@/icons/icon-adjust.vue'
import IconReset from '@/icons/icon-reset.vue'
import IconInfo from '@/icons/icon-info.vue'

const { theme } = useTheme()

defineProps({
  post: { type: Object }
})

const showAdjust = ref(store('showAdjust') || false)
const showDetails = ref(store('showDetails') || false);
const sizeFormat = (d) => d.toFixed(1)

let adj = reactive({
  hasAdjusted: false,
  contrast: 1,
  saturation: 1,
  brightness: 1,
  blur: 0
})

function store (key, val) {
  if (typeof val === "undefined") {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      return false
    }
  }

  return localStorage.setItem(key, JSON.stringify(val))
}

function handleDetails (e) {
  showDetails.value = !showDetails.value;
  store('showDetails', showDetails.value)
}

function handleAdjust (e) {
  showAdjust.value = !showAdjust.value
  store('showAdjust', showAdjust.value)
}

function handleReset (e) {
  adj.blur = 0;
  adj.brightness = 1;
  adj.saturation = 1;
  adj.contrast = 1;
  adj.hasAdjusted = false;
}

</script>

<style>
.post {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  padding: 2dvh;
  position: relative;

  @media (min-width: 50rem) {
    flex-flow: row nowrap;
    padding: 5dvh;
  }
}

.post__info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  width: 100%;
  
  @media (min-width: 50rem) {
    max-width: 20rem;
  }
}

.post__image-container {
  align-items: flex-start;
  display: flex;
  flex-grow: 1;
  justify-content: center;

  @media (min-width: 50rem) {
    align-items: flex-start;
    justify-content: center;
  }
}

.post__image {
  border-radius: 0.5rem;
  box-shadow: 0 0 5px rgba(0,0,0,0.35);
  contain: layout;
  max-height: 90dvh;
  max-width: 100%;
  object-fit: contain;
  view-transition-name: art-image;
}

.post__nav {
  display: flex;
  flex-flow: row nowrap;
  gap: 0.5rem;
}

.post__link {
  align-items: center;
  background-color: var(--color-background);
  border-radius: 9999px;
  border: 1px solid var(--color-text);
  display: flex;
  flex-direction: column;
  height: 1.5rem;
  justify-content: center;
  width: 1.5rem;
  
  @media (min-width: 30rem) {
    height: 1.75rem;
    width: 1.75rem;
  }
}

.post__link[data-dir="up"] > svg { transform: rotate(-90deg);}
.post__link[data-dir="left"] > svg { transform: rotate(180deg);}
.post__link[data-dir="right"] > svg { transform: rotate(0deg);}

.post__title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-block: 0;
  text-wrap: balance;

  @media (min-width: 50rem) {
    font-size: 1.5rem;
    margin-block: 1rem;
  }
}

.post__details {
  border-left: 0.25rem solid var(--color-text);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1rem;
  font-size: 0.875rem;
  text-transform: capitalize;

  @media (min-width: 30rem) {
    font-size: 1rem;
  }
}

.post__links {
  font-weight: 600;
}

.post__unit {
  text-transform: lowercase;
}

.post__link {
  align-items: center;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  gap: 0.25rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.post__buttons {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  gap: 0.5rem;
}

.post__buttons button {
  border: 1px solid var(--color-border);
}
</style>
