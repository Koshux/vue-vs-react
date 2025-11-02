import './assets/tailwind.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createPersistPlugin } from './plugins/persist'

const app = createApp(App)
const pinia = createPinia()

pinia.use(createPersistPlugin({
  paths: ['items', 'currentFilter'],
  version: 2,
}))

app
  .use(pinia)
  .use(router)
  .mount('#app')
