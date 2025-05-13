<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #f7fafc;">
    <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); width: 100%; max-width: 400px;">
      <h2 style="margin-bottom: 1.5rem; text-align: center;">Вход в систему</h2>
      
      <div class="p-field" style="margin-bottom: 1rem;">
        <label for="username" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Имя пользователя</label>
        <InputText 
          id="username" 
          v-model="form.username" 
          placeholder="Введите имя пользователя"
          style="width: 100%;"
          @keyup.enter="handleLogin"
        />
      </div>

      <div class="p-field" style="margin-bottom: 1.5rem;">
        <label for="password" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Пароль</label>
        <InputText 
          id="password" 
          v-model="form.password" 
          type="password" 
          placeholder="Введите пароль"
          style="width: 100%;"
          @keyup.enter="handleLogin"
        />
      </div>

      <Button 
        label="Войти" 
        icon="pi pi-sign-in" 
        style="width: 100%;"
        :loading="loading"
        @click="handleLogin"
      />

      <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 4px; font-size: 0.9rem;">
        <p style="margin: 0 0 0.5rem 0; font-weight: 500;">Тестовые учетные данные:</p>
        <ul style="margin: 0; padding-left: 1.5rem;">
          <li>admin / admin (Администратор)</li>
          <li>manager / manager (Менеджер)</li>
          <li>user / user (Пользователь)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()
const loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

// Тестовые учетные данные
const testUsers = {
  'admin': { password: 'admin', role: 'admin' },
  'manager': { password: 'manager', role: 'manager' },
  'user': { password: 'user', role: 'user' }
}

async function handleLogin() {
  if (!form.username || !form.password) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Введите имя пользователя и пароль', life: 3000 })
    return
  }

  loading.value = true

  try {
    const user = testUsers[form.username]
    
    if (user && user.password === form.password) {
      // Сохраняем информацию о пользователе
      localStorage.setItem('user', JSON.stringify({
        username: form.username,
        role: user.role
      }))

      toast.add({ severity: 'success', summary: 'Успех', detail: 'Вход выполнен', life: 2000 })

      // Перенаправляем в зависимости от роли
      switch (user.role) {
        case 'admin':
          router.push('/users')
          break
        case 'manager':
          router.push('/products')
          break
        case 'user':
          router.push('/products')
          break
      }
    } else {
      toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Неверное имя пользователя или пароль', life: 3000 })
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Произошла ошибка при входе', life: 3000 })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.p-field label {
  color: #4a5568;
}
</style> 