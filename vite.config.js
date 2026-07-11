import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginPosts from './plugins/vite-plugin-posts';
import vitePluginImages from './plugins/vite-plugin-images';
import posts from './posts.json' with { type: 'json' };

export default defineConfig({
  plugins: [
    vue(),
    vitePluginImages({
      posts,
      baseUrl: resolve(import.meta.dirname, './'),
      presets: {
        thumb: { resize: { width: 500 }, format: 'jpg', options: { quality: 80 } },
        full: { format: 'webp', options: { quality: 75, effort: 3 } },
      }
    }),
    vitePluginPosts({
      posts,
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
})
