import { createApp } from 'vue'
import App from '@/views/home-view.vue'
import '@/styles/main.css'

const data = window.CURATED

createApp(App, data).mount('#app')
