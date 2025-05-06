<template>
  <div>
    <h1>Отчет по складу</h1>

    <!-- Фильтр по категории -->
    <select v-model="selectedCategory">
      <option value="">Все категории</option>
      <option v-for="cat in categories" :value="cat" :key="cat">{{ cat }}</option>
    </select>

    <!-- Таблица товаров -->
    <table border="1" cellpadding="10" cellspacing="0">
      <thead>
        <tr>
          <th>Название</th>
          <th>Категория</th>
          <th>Остаток</th>
          <th>Цена</th>
          <th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in filteredByCategory" :key="p.sku">
          <td>{{ p.name }}</td>
          <td>{{ p.category }}</td>
          <td>{{ p.quantity }}</td>
          <td>{{ p.price }} руб.</td>
          <td>{{ p.quantity * p.price }} руб.</td>
        </tr>
      </tbody>
    </table>

    <!-- Кнопка выгрузки в Excel -->
    <button @click="exportToExcel">Выгрузить в Excel</button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

// Список категорий
const categories = ['Муфта', 'Отвод', 'Заглушка', 'Тройник', 'Э.м. клапан', 'Циф.обор.', 'Держатель капельных линий']

// Выбранная категория
const selectedCategory = ref('')

// Данные товаров
const products = ref([])

// Загрузка данных при старте
const fetchProducts = async () => {
  const res = await axios.get('/api/products')
  products.value = res.data
}
fetchProducts()

// Фильтрация по категории
const filteredByCategory = computed(() => {
  if (!selectedCategory.value) return products.value
  return products.value.filter(p => p.category === selectedCategory.value)
})

// Экспорт в Excel
const exportToExcel = async () => {
  try {
    const res = await axios.get('/api/report/excel', { responseType: 'blob' })
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'отчет_по_складу.xlsx')
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    alert('Ошибка при экспорте отчета')
    console.error(error)
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  text-align: left;
  padding: 8px;
  border: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

select {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>