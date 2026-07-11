<template>
  <img :src="loc" loading="lazy" />
</template>

<script setup>
const { src, preset } = defineProps({
  src: { type: String },
  preset: { type: String }
})

const regex = /(.*)(\.\w+)$/
const loc = (import.meta.env.DEV) ? `${src}?p=${preset}` : src.replace(regex, `$1.${preset}.jpg`)
</script>