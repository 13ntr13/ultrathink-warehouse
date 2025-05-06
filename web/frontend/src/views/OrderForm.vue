<template>
  <div>
    <h1>Собрать заказ</h1>
    <input v-model="searchQuery" placeholder="Поиск товара">
    <ul>
      <li v-for="p in filteredProducts" :key="p.sku">
        {{ p.name }} ({{ p.sku }}) — {{ p.quantity }}
        <input type="number" min="0" v-model.number="order[p.sku]" />
      </li>
    </ul>
    <button @click="submitOrder">Подтвердить заказ</button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

const products = ref([])
const order = ref({})
const searchQuery = ref('')

const fetchProducts = async () => {
  const res = await axios.get('/api/products')
  products.value = res.data
}

const filteredProducts = computed(() => {
  return products.value.filter(p =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.sku.includes(searchQuery.value)
  )
})

const submitOrder = async () => {
  for (const sku in order.value) {
    const qty = order.value[sku]
    if (qty > 0) {
      await axios.delete(`/api/products/${sku}?amount=${qty}`)
    }
  }
  alert("✅ Заказ собран")
}

fetchProducts()
</script>