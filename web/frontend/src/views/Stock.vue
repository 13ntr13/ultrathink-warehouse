<template>
  <div>
    <h1>Остатки</h1>
    <input v-model="searchQuery" placeholder="Поиск по SKU или названию">
    <ProductTable
      :products="filteredProducts"
      @delete="removeStock"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import ProductTable from '../components/ProductTable.vue'

const products = ref([])
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

const removeStock = async (sku) => {
  await axios.delete(`/api/products/${sku}`)
  fetchProducts()
}

fetchProducts()
</script>