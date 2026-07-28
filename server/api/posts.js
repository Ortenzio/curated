import { defineEventHandler } from '#imports'
import posts from '~/data/posts.json'

export default defineEventHandler((event) => {
  return posts.map((d) => ({
    slug: d.slug,
    image: d.image,
    title: d.title
  }))
})
