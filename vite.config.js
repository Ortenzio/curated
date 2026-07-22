import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginPosts from './plugins/vite-plugin-posts.js';
import vitePluginImages from './plugins/vite-plugin-images.js';
import posts from './posts.json' with { type: 'json' };

const imgRegex = /(\.\w+)$/

posts.forEach((p) => {
  p.imageFull = p.image.replace(imgRegex, '.full.webp')
  p.imageThumb = p.image.replace(imgRegex, '.thumb.jpg')
})

export default defineConfig(({mode}) => {

  const env = loadEnv(mode, process.cwd(), '')

  return ({
    plugins: [
      vue(),
      vitePluginImages({
        posts,
        basePath: resolve(import.meta.dirname, './docs'),
        baseUrl: resolve(import.meta.dirname, './'),
        presets: {
          thumb: { resize: { width: 500 }, format: 'jpg', options: { quality: 80 } },
          full: { format: 'webp', options: { quality: 75, effort: 3 } },
        }
      }),
      vitePluginPosts({
        posts,
        host: env.VITE_APP_HOST,
        baseUrl: '',
        postTemplate: resolve(import.meta.dirname, 'post.html'),
        indexTemplate: resolve(import.meta.dirname, 'index.html')
      })
    ],
    resolve: {
      alias: {
        '@': resolve(import.meta.dirname, './src')
      },
    },
    appType: 'mpa',
    css: {
      transformer: 'postcss',
    },
    build: {
      cssMinify: 'esbuild'
    },
    ssr: true
  });

})
