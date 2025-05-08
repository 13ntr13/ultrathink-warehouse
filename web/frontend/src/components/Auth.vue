<template>
    <div>
      <h2>Авторизация</h2>
      <input v-model="user.username" placeholder="Логин">
      <input v-model="user.password" type="password" placeholder="Пароль">
      <button @click="login">Войти</button>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  import { ref } from 'vue'
  
  const user = ref({ username: '', password: '' })
  const emit = defineEmits(['login'])
  
  const login = async () => {
    const res = await axios.post('/login', {
      username: user.value.username,
      password: user.value.password
    })
  
    if (res.status === 200) {
      localStorage.setItem('token', res.data.access_token)
      emit('login')
    }
  }
  </script>