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

// Функция проверки авторизации
function checkAuth(to, from, next) {
  const userStr = localStorage.getItem('user')
  if (!userStr) {
    next('/auth')
    return
  }

  try {
    const user = JSON.parse(userStr)
    
    // Проверяем доступ к маршруту в зависимости от роли
    if (to.meta.roles && !to.meta.roles.includes(user.role)) {
      // Если нет доступа, перенаправляем на главную страницу
      switch (user.role) {
        case 'admin':
          next('/users')
          break
        case 'manager':
          next('/products')
          break
        case 'user':
          next('/products')
          break
        default:
          next('/auth')
      }
      return
    }

    next()
  } catch (e) {
    next('/auth')
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      redirect: to => {
        const userStr = localStorage.getItem('user')
        if (userStr) {
          try {
            const user = JSON.parse(userStr)
            switch (user.role) {
              case 'admin': return '/users'
              case 'manager': return '/products'
              case 'user': return '/products'
            }
          } catch (e) {}
        }
        return '/auth'
      }
    },
    { 
      path: '/auth', 
      component: () => import('./views/Auth.vue'),
      meta: { requiresAuth: false }
    },
    { 
      path: '/users', 
      component: () => import('./views/Users.vue'),
      meta: { requiresAuth: true, roles: ['admin'] },
      beforeEnter: checkAuth
    },
    { 
      path: '/products', 
      component: () => import('./views/Products.vue'),
      meta: { requiresAuth: true },
      beforeEnter: checkAuth
    },
    { 
      path: '/orders', 
      component: () => import('./views/Orders.vue'),
      meta: { requiresAuth: true, roles: ['admin', 'manager'] },
      beforeEnter: checkAuth
    },
    { 
      path: '/my-orders', 
      component: () => import('./views/MyOrders.vue'),
      meta: { requiresAuth: true, roles: ['user'] },
      beforeEnter: checkAuth
    },
    { 
      path: '/reports', 
      component: () => import('./views/Reports.vue'),
      meta: { requiresAuth: true, roles: ['admin', 'manager'] },
      beforeEnter: checkAuth
    },
    { 
      path: '/settings', 
      component: () => import('./views/Settings.vue'),
      meta: { requiresAuth: true, roles: ['admin'] },
      beforeEnter: checkAuth
    }
  ]
})

// Глобальный навигационный guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    checkAuth(to, from, next)
  } else {
    next()
  }
})

const app = createApp(App)

// Register PrimeVue components
app.component('Card', Card)
app.component('Chart', Chart)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Toast', Toast)
app.component('SelectButton', SelectButton)

app.use(PrimeVue)
app.use(ToastService)
app.use(router)

app.mount('#app') 