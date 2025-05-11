<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh;">
    <h2>Вход в систему (заглушка)</h2>
    <button @click="goDashboard">Войти</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goDashboard = () => {
  router.push('/dashboard')
}
</script> 