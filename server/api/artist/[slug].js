import { defineEventHandler, getRouterParam, createError } from '#imports'
import { groupBy } from '~/utils/group-by.js'
import { normalizeString } from '~/utils/normalize-string.js'
import posts from '~/data/posts.json'

const entries = new Map()

groupBy(posts, 'artist').forEach((d) => {
  if (!d || !d.key) {
    return;
  }

  const slug = normalizeString(d.key)
  entries.set(slug, ({ slug, name: d.key, results: d.items }))
})

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const results = entries.get(slug)

  if (!results) {
    throw createError({ statusCode: 404 })
  }

  return results
})
