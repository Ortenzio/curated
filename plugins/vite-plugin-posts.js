import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path'

/**
 * @param {object} presets 
 * @param {string} presets.baseUrl
 * @param {string} presets.host
 * @param {string} presets.posts
 * @param {string} presets.postTemplate
 * @param {string} presets.indexTemplate
 * @returns {import("vite").Plugin}
 */
export default async function vitePluginPosts (presets) {

  const name = 'vite-plugin-posts'
  const enforce = 'pre'
  const { baseUrl, postTemplate, indexTemplate, posts, host } = presets;
  const entries = new Map()
  const postHtml = await readFile(postTemplate, 'utf8')
  const indexHtml = await readFile(indexTemplate, 'utf8')

  /**
   * @param {import("vite").ViteDevServer} server
   */
  function configureServer (server) {

    server.middlewares.use((req, res, next) => {
      const { url } = req;

      if (url === `${baseUrl}/`) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html")
        res.end(getIndexHtml(indexHtml, posts))
        return;
      }

      if (!url.startsWith(baseUrl + '/post/')) {
        return next();
      }

      const htmlPath = resolve(`./${url}/index.html`);
      const post = entries.get(htmlPath)

      if (!post) {
        return next();
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html")
      res.end(getPostHtml(postHtml, post))
    })

  }

  function resolveId (id) {
    if (entries.has(id)) {
      return id;
    }
  }

  function load (id) {
    if (entries.has(id)) {
      return readFile(postTemplate, 'utf8')
    }

    if (id === indexTemplate) {
      return readFile(indexTemplate, 'utf8')
    }
  }

  const transformIndexHtml = {
    order: 'pre',
    handler (html, ctx) {
      const post = entries.get(ctx.filename)

      if (ctx.filename === indexTemplate) {
        return getIndexHtml(indexHtml, posts)
      }

      if (!post) {
        return
      }

      return getPostHtml(html, post);
    }
  }

  function config () {
    const inputs = {};

    const len = posts.length

    posts.forEach((post, i) => {
      const htmlPath = resolve(`./${baseUrl}/post/${post.slug}/index.html`);
      const prevPost = posts[((i+len)-1) % len];
      const nextPost = posts[((i+len)+1) % len];

      const prev = (prevPost) ? prevPost.slug : null;
      const next = (nextPost) ? nextPost.slug : null;

      inputs[`post-${post.slug}`] = htmlPath
      entries.set(htmlPath, { ...post, prev, next });
    })

    inputs.main = indexTemplate
    // entries.set(indexTemplate, { posts })

    return {
      build: {
        rolldownOptions: {
          input: {
            main: resolve('index.html'),
            ...inputs
          }
        }
      }
    }
  }

  function getIndexHtml (html, posts) {

    const arr = posts.map((d) => ({
      slug: d.slug,
      image: d.image
    }))

    const script = [
      '<script id="post-data"></script>',
      `<script id="post-data">window.CURATED = ${JSON.stringify({ posts: arr })}</script>`
    ]

    return html.replace(...script);
  }

  function getFullImageUrl (src) {
    return `${host}${src.replace(/(\.\w+)$/, '.full.webp')}`
  }

  function getPostHtml (html, post) {

    const imgSrc = getFullImageUrl(post.image)

    const meta = `
      <script id="post-data">window.CURATED = ${JSON.stringify({ post })}</script>
      <meta property="og:url" content="${host}/post/${post.slug}/" />
      <meta property="og:title" content=${JSON.stringify(post.title.replaceAll('"', "'"))} />
      <meta property="og:image" content="${imgSrc}" />
      <link rel="preload" as="image" href="${imgSrc}" />
      <title>${post.title} - Curated</title>
    </head>
    `

    const result = html.replace('</head>', meta)
    return result;
  }

  return ({
    name,
    enforce,
    transformIndexHtml,
    config,
    configureServer,
    resolveId,
    load
  })

}
