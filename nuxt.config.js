import { rmSync } from 'node:fs';
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
      rmSync('.output/public/collection', { recursive: true, force: true })
      rmSync('dist', { force: true })
      console.log('CURATED: nitro build finished')
    }
  },
  nitro: {
    noSymlink: true,
    hooks: {
      "prerender:generate" (route) {
        if (route.contentType?.includes('text/html') && route.contents) {
          route.contents = route.contents.replace(`<div id="teleports"></div>`, '')
        }
      }
    }
  },
  compatibilityDate: '2024-04-03'
})