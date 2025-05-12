import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import { logError } from './logger'

// PrimeVue Components
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import SelectButton from 'primevue/selectbutton'

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

// Register PrimeVue components
app.component('Card', Card)
app.component('Chart', Chart)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Toast', Toast)
app.component('SelectButton', SelectButton)

app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.mount('#app') 