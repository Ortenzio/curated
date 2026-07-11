import { createApp } from 'vue'
import App from '@/views/post-view.vue'
import '@/styles/main.css'

const data = window.CURATED

createApp(App, data).mount('#app')
