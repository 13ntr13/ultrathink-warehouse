<template>
    <div id="app">
      <nav v-if="isLoggedIn">
        <router-link to="/">Остатки</router-link> |
        <router-link to="/add">Добавить</router-link> |
        <router-link to="/order">Собрать заказ</router-link> |
        <router-link to="/report">Отчет</router-link> |
        <button @click="logout">Выход</button>
      </nav>
  
      <Auth v-if="!isLoggedIn" @login="setToken"/>
  
      <router-view v-else />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const isLoggedIn = ref(false)
  const setToken = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer your_token_here'
    isLoggedIn.value = true
  }
  
  const logout = () => {
    delete axios.defaults.headers.common['Authorization']
    isLoggedIn.value = false
  }
  </script>