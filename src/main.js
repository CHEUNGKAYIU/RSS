import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import RSSList from './components/RSSList.vue'
import RSSSettings from './components/RSSSettings.vue'
import './style.css'

const routes = [
  { path: '/', component: RSSList },
  { path: '/settings', component: RSSSettings }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
