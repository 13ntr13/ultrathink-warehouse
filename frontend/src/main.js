import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    { path: '/auth', component: () => import('./views/Auth.vue') },
    { path: '/dashboard', component: () => import('./views/Dashboard.vue') },
    { path: '/products', component: () => import('./views/Products.vue') },
    { path: '/users', component: () => import('./views/Users.vue') },
  ]
})

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.mount('#app') 