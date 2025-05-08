import { createRouter, createWebHistory } from 'vue-router'
import Stock from '../views/Stock.vue'
import AddProduct from '../views/AddProduct.vue'
import OrderForm from '../views/OrderForm.vue'
import Report from '../views/Report.vue'

const routes = [
  { path: '/', component: Stock },
  { path: '/add', component: AddProduct },
  { path: '/order', component: OrderForm },
  { path: '/report', component: Report }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router