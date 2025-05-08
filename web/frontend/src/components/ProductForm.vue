<template>
  <form @submit.prevent="submit">
    <input v-model="product.sku" placeholder="SKU">
    <input v-model="product.name" placeholder="Название">
    <input v-model="product.rack" placeholder="Стеллаж">
    <input v-model.number="product.quantity" type="number" placeholder="Количество">
    <button type="submit">Сохранить</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const product = ref({ sku: '', name: '', rack: '', quantity: 0 })

const submit = async () => {
  await axios.post('/api/products', product.value)
  alert("✅ Товар добавлен!")
}
</script>