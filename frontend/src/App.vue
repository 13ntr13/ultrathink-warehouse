<template>
  <div style="min-height: 100vh; background: #f7fafc;">
    <Toast />
    
    <!-- Навигация -->
    <nav v-if="isLoggedIn" style="background: white; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <router-link to="/" style="text-decoration: none; color: #2d3748; font-weight: 500;">UltraThink</router-link>
          
          <!-- Ссылки для админа -->
          <template v-if="userRole === 'admin'">
            <router-link to="/users" style="text-decoration: none; color: #4a5568;">Пользователи</router-link>
            <router-link to="/products" style="text-decoration: none; color: #4a5568;">Товары</router-link>
            <router-link to="/orders" style="text-decoration: none; color: #4a5568;">Заказы</router-link>
            <router-link to="/reports" style="text-decoration: none; color: #4a5568;">Отчёты</router-link>
            <router-link to="/settings" style="text-decoration: none; color: #4a5568;">Настройки</router-link>
          </template>

          <!-- Ссылки для менеджера -->
          <template v-if="userRole === 'manager'">
            <router-link to="/products" style="text-decoration: none; color: #4a5568;">Товары</router-link>
            <router-link to="/orders" style="text-decoration: none; color: #4a5568;">Заказы</router-link>
            <router-link to="/reports" style="text-decoration: none; color: #4a5568;">Отчёты</router-link>
          </template>

          <!-- Ссылки для пользователя -->
          <template v-if="userRole === 'user'">
            <router-link to="/products" style="text-decoration: none; color: #4a5568;">Товары</router-link>
            <router-link to="/my-orders" style="text-decoration: none; color: #4a5568;">Мои заказы</router-link>
          </template>
        </div>

        <div style="display: flex; gap: 1rem; align-items: center;">
          <span style="color: #4a5568;">{{ username }}</span>
          <Button 
            icon="pi pi-sign-out" 
            label="Выйти" 
            class="p-button-text" 
            @click="handleLogout"
          />
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const isLoggedIn = ref(false)
const userRole = ref('')
const username = ref('')

// Проверяем авторизацию при загрузке
onMounted(() => {
  checkAuth()
})

// Следим за изменениями в localStorage
watch(() => localStorage.getItem('user'), () => {
  checkAuth()
})

function checkAuth() {
  const userStr = localStorage.getItem('user')
  if (userStr) {
    try {
      const user = JSON.parse(userStr)
      isLoggedIn.value = true
      userRole.value = user.role
      username.value = user.username
    } catch (e) {
      handleLogout()
    }
  } else {
    handleLogout()
  }
}

function handleLogout() {
  localStorage.removeItem('user')
  isLoggedIn.value = false
  userRole.value = ''
  username.value = ''
  router.push('/auth')
  toast.add({ severity: 'info', summary: 'Выход', detail: 'Вы вышли из системы', life: 2000 })
}
</script>

<style>
body {
  font-family: 'Inter', system-ui, sans-serif;
  margin: 0;
}

a.router-link-active {
  color: #2b6cb0 !important;
  font-weight: 500;
}
</style> 