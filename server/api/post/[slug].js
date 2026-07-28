import { defineEventHandler, getRouterParam, createError } from '#imports'
import posts from '~/data/posts.json'

const entries = new Map()
const len = posts.length;

posts.forEach((d, i) => {
  const prev = posts[((i+len)+1) % len];
  const next = posts[((i+len)-1) % len];

  d.prev = { slug: prev?.slug, image: prev?.image }
  d.next = { slug: next?.slug, image: next?.image }

  entries.set(d.slug, d);
})

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const post = entries.get(slug)

  if (!post) {
    throw createError({ statusCode: 404 })
  }

  return post
})
