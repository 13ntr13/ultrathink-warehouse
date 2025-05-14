import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { supabase } from '@ultrathink/supabase-client'

// Создаем приложение
const app = createApp(App)

// Используем Pinia для управления состоянием
const pinia = createPinia()
app.use(pinia)

// Используем Vue Router
app.use(router)

// Добавляем Supabase клиент в глобальные свойства
app.config.globalProperties.$supabase = supabase

// Монтируем приложение
app.mount('#app')

// Экспортируем для использования в других файлах
export { app, supabase } 