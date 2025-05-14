import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import SharedComponents from '../views/SharedComponents.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/OrdersView.vue')
  },
  {
    path: '/shared-components',
    name: 'shared-components',
    component: SharedComponents
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Защита маршрутов
router.beforeEach(async (to, from, next) => {
  const { supabase } = await import('@ultrathink/supabase-client')
  const { data: { session } } = await supabase.auth.getSession()

  // Публичные маршруты
  const publicRoutes = ['/login']
  
  if (!session && !publicRoutes.includes(to.path)) {
    next('/login')
  } else {
    next()
  }
})

export default router 