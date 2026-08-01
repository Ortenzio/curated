import { rm, writeFile, rename } from 'node:fs/promises';
import posts from './data/posts.json' with { type: 'json' };

export default defineNuxtConfig({
  modules: [
    '@nuxt/image'
  ],
  imports: {
    autoImport: false,
  },
  app: {
    rootId: 'curated',
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      script: [
        { innerHTML: `document.documentElement.style.colorScheme = localStorage.getItem('curated:theme') || "light"` },
        { src: '/scripts/curated-theme-toggle.js', type: 'module' },
        { src: '/scripts/curated-image.js', type: 'module' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  },
  experimental: {
    appManifest: false
  },
  devtools: { 
    enabled: false 
  },
  image: {
    dir: 'assets',
    inject: true,
    presets: {
      full: {
        modifiers: {
          format: "webp",
          quality: 80,
          loading: 'eager'
        }
      },
      thumb: {
        modifiers: {
          format: "webp",
          width: 600,
          quality: 60,
          loading: 'lazy'
        }
      }
    }
  },
  features: {
    inlineStyles: false
  },
  routeRules: {
    '/**': {
      noScripts: true
    }
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('curated-')
    }
  },
  vite: {
    server: {
      allowedHosts: ['next.nba.com']
    },
    css: {
      transformer: 'postcss'
    },
    build: {
      cssMinify: 'esbuild'
    }
  },
  hooks: {
    async 'prerender:routes' (ctx) {
      for (const post of posts) {
        ctx.routes.add(`/post/${post.slug}`);
      } 
    },

    async 'build:done' (ctx) {
      console.log('CURATED: nuxt build finished')
    },

    async 'close' (ctx) {
      await rm('.output/public/collection', { recursive: true, force: true })
      await rm('dist', { force: true })
      // await rm('.output/public/_nuxt', { force: true, recursive: true })
      await rename('.output/public/_ipx', '.output/public/ipx');
      await rename('.output/public/ipx/f_webp&q_80&loading_eager', '.output/public/ipx/full');
      await rename('.output/public/ipx/f_webp&w_600&q_60&loading_lazy', '.output/public/ipx/thumb');
      await writeFile('.output/public/.nojekyll', '', 'utf8')

      console.log('CURATED: nitro build finished')
    }
  },
  nitro: {
    noSymlink: true,
    hooks: {
      "prerender:generate" (route) {
        if (route.contentType?.includes('text/html') && route.contents) {
          route.contents = route.contents
            .replace(`<div id="teleports"></div>`, '')
            .replaceAll(`data-nuxt-img`, '')
            .replaceAll(/(image)?srcset=".*?"/g, '')
            .replaceAll(/onerror=".*?"/g, '')
            .replaceAll("_ipx/f_webp&amp;q_80&amp;loading_eager", "ipx/full")
            .replaceAll("_ipx/f_webp&amp;w_600&amp;q_60&amp;loading_lazy", "ipx/thumb")
        }
      }
    }
  },
  experimental: {
    buildCache: true
  },
  compatibilityDate: '2024-04-03'
})