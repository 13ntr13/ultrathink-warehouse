<template>
  <div>
    <h1>Добавить товар</h1>
    <form @submit.prevent="submit">
      <input v-model="product.sku" placeholder="SKU">
      <input v-model="product.brand" placeholder="Бренд">
      <input v-model="product.name" placeholder="Название">
      <input v-model="product.rack" placeholder="Стеллаж">
      <input v-model.number="product.quantity" type="number" placeholder="Количество">
      <input v-model.number="product.price" type="number" placeholder="Цена">
      <select v-model="product.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const categories = ['Муфта', 'Отвод', 'Заглушка', 'Тройник']

const product = ref({
  sku: '',
  name: '',
  brand: '',
  rack: '',
  quantity: 0,
  price: 0,
  category: ''
})

const submit = async () => {
  await axios.post('/api/products', product.value)
  alert("✅ Товар добавлен!")
}
</script>