<template>
  <div class="dashboard">
    <Toast />
    
    <!-- Period Filter -->
    <div class="period-filter">
      <Card>
        <template #content>
          <div class="filter-content">
            <span class="filter-label">Период:</span>
            <SelectButton v-model="selectedPeriod" :options="periodOptions" optionLabel="name" optionValue="value" />
          </div>
        </template>
      </Card>
    </div>

    <!-- Filter for trend chart -->
    <div style="margin-bottom: 1rem; max-width: 350px;">
      <Dropdown v-model="trendCategory" :options="trendCategoryOptions" optionLabel="label" optionValue="value" placeholder="All categories" showClear />
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      <Card class="kpi-card">
        <template #title>Всего товаров</template>
        <template #content>
          <div class="kpi-value">{{ totalProducts }}</div>
        </template>
      </Card>
      
      <Card class="kpi-card">
        <template #title>Категорий</template>
        <template #content>
          <div class="kpi-value">{{ categoriesCount }}</div>
        </template>
      </Card>
      
      <Card class="kpi-card">
        <template #title>Брендов</template>
        <template #content>
          <div class="kpi-value">{{ brandsCount }}</div>
        </template>
      </Card>
      
      <Card class="kpi-card">
        <template #title>Суммарная стоимость</template>
        <template #content>
          <div class="kpi-value">{{ formatCurrency(totalValue) }}</div>
        </template>
      </Card>
      
      <Card class="kpi-card">
        <template #title>С нулевым остатком</template>
        <template #content>
          <div class="kpi-value warning">{{ zeroStockCount }}</div>
        </template>
      </Card>
      
      <Card class="kpi-card">
        <template #title>Без цены</template>
        <template #content>
          <div class="kpi-value warning">{{ noPriceCount }}</div>
        </template>
      </Card>
      
      <Card class="kpi-card">
        <template #title>SKU</template>
        <template #content>
          <div class="kpi-value">{{ skuCount }}</div>
        </template>
      </Card>
    </div>

    <!-- Charts -->
    <div class="charts-grid">
      <Card class="chart-card">
        <template #title>Распределение по категориям</template>
        <template #content>
          <Chart type="pie" :data="categoryChartData" :options="chartOptions" />
        </template>
      </Card>
      
      <Card class="chart-card">
        <template #title>Распределение по брендам</template>
        <template #content>
          <Chart type="pie" :data="brandChartData" :options="chartOptions" />
        </template>
      </Card>
      
      <Card class="chart-card">
        <template #title>Статус товаров</template>
        <template #content>
          <Chart type="doughnut" :data="statusChartData" :options="chartOptions" />
        </template>
      </Card>

      <Card class="chart-card full-width">
        <template #title>Динамика изменения количества товаров</template>
        <template #content>
          <Chart type="line" :data="trendChartData" :options="trendChartOptions" />
        </template>
      </Card>
    </div>

    <!-- Recent Changes Table -->
    <Card class="table-card">
      <template #title>Последние изменения</template>
      <template #content>
        <DataTable :value="recentChanges" :paginator="true" :rows="10" responsiveLayout="scroll">
          <Column field="name" header="Товар" sortable></Column>
          <Column field="category" header="Категория" sortable></Column>
          <Column field="brand" header="Бренд" sortable></Column>
          <Column field="price" header="Цена (BYN)" sortable>
            <template #body="slotProps">{{ formatCurrency(slotProps.data.price) }}</template>
          </Column>
          <Column field="quantity" header="Остаток" sortable></Column>
          <Column field="rack" header="Стеллаж" sortable></Column>
          <Column field="updated_at" header="Обновлено" sortable>
            <template #body="slotProps">{{ formatDate(slotProps.data.updated_at) }}</template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import SelectButton from 'primevue/selectbutton'
import { useToast } from 'primevue/usetoast'
import { supabase } from '../supabase'
import Dropdown from 'primevue/dropdown'

// Utility Functions
const formatCurrency = (value) => {
  return new Intl.NumberFormat('ru-BY', {
    style: 'currency',
    currency: 'BYN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const formatDate = (date, short = false) => {
  const options = short 
    ? { month: 'short', day: 'numeric', hour: '2-digit' }
    : { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(date).toLocaleDateString('ru-RU', options)
}

const toast = useToast()
const products = ref([])
const loading = ref(false)

// KPI Values
const totalProducts = computed(() => products.value.length)
const totalValue = computed(() => products.value.reduce((sum, product) => sum + (product.price * product.quantity), 0))
const lowStockCount = computed(() => products.value.filter(p => p.quantity < 10).length)
const categoriesCount = computed(() => new Set(products.value.map(p => p.category)).size)
const brandsCount = computed(() => new Set(products.value.map(p => p.brand)).size)
const skuCount = computed(() => new Set(products.value.map(p => p.sku)).size)
const noPriceCount = computed(() => products.value.filter(p => !p.price || p.price === 0).length)
const zeroStockCount = computed(() => products.value.filter(p => !p.quantity || p.quantity === 0).length)

// Chart Data
const categoryChartData = computed(() => {
  const categoryCounts = products.value.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1
    return acc
  }, {})
  return {
    labels: Object.keys(categoryCounts),
    datasets: [{
      data: Object.values(categoryCounts),
      backgroundColor: [
        '#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#8BC34A','#E91E63','#00BCD4','#CDDC39'
      ]
    }]
  }
})
const brandChartData = computed(() => {
  const brandCounts = products.value.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1
    return acc
  }, {})
  return {
    labels: Object.keys(brandCounts),
    datasets: [{
      data: Object.values(brandCounts),
      backgroundColor: [
        '#4BC0C0','#FF6384','#36A2EB','#FFCE56','#9966FF','#FF9F40','#8BC34A','#E91E63','#00BCD4','#CDDC39'
      ]
    }]
  }
})
const statusChartData = computed(() => {
  const statusCounts = {
    in_stock: products.value.filter(p => p.quantity >= 10).length,
    low_stock: products.value.filter(p => p.quantity > 0 && p.quantity < 10).length,
    out_of_stock: products.value.filter(p => p.quantity === 0).length
  }
  return {
    labels: ['В наличии', 'Низкий запас', 'Нет в наличии'],
    datasets: [{
      data: Object.values(statusCounts),
      backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
    }]
  }
})

const chartOptions = {
  plugins: {
    legend: { position: 'bottom' }
  }
}

// Recent Changes
const recentChanges = computed(() => {
  return [...products.value]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 10)
})

// Period Filter
const periodOptions = [
  { name: 'День', value: 'day' },
  { name: 'Неделя', value: 'week' },
  { name: 'Месяц', value: 'month' }
]
const selectedPeriod = ref('day')

// Categories for trend filter
const trendCategory = ref(null)
const trendCategoryOptions = computed(() => {
  const unique = [...new Set(products.value.map(p => p.category).filter(Boolean))]
  return unique.map(cat => ({ label: cat, value: cat }))
})

// Trend Chart Data (with category filter)
const trendData = ref([])
const trendChartData = computed(() => {
  const labels = trendData.value.map(item => formatDate(item.date, true))
  const quantities = trendData.value.map(item => item.total_quantity)
  const lowStock = trendData.value.map(item => item.low_stock_count)
  return {
    labels,
    datasets: [
      {
        label: 'Общее количество',
        data: quantities,
        borderColor: '#2196F3',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Товары с низким запасом',
        data: lowStock,
        borderColor: '#FFC107',
        tension: 0.4,
        fill: false
      }
    ]
  }
})
const trendChartOptions = {
  plugins: {
    legend: { position: 'top' }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Количество товаров' },
      ticks: {
        stepSize: 1,
        callback: function(value) { return Number.isInteger(value) ? value : null }
      }
    },
    x: {
      title: { display: true, text: 'Дата' }
    }
  }
}

// Fetch trend data
async function fetchTrendData() {
  try {
    const now = new Date()
    let startDate = new Date()
    switch (selectedPeriod.value) {
      case 'day': startDate.setHours(0, 0, 0, 0); break
      case 'week': startDate.setDate(now.getDate() - 7); break
      case 'month': startDate.setMonth(now.getMonth() - 1); break
    }
    let query = supabase.from('products').select('*').gte('updated_at', startDate.toISOString()).order('updated_at', { ascending: true })
    if (trendCategory.value) query = query.eq('category', trendCategory.value)
    const { data, error } = await query
    if (error) throw error
    const groupedData = groupDataByPeriod(data, selectedPeriod.value)
    trendData.value = groupedData
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные тренда', life: 3000 })
  }
}

// Helper function to group data by period
function groupDataByPeriod(data, period) {
  const groups = {}
  const interval = period === 'day' ? 'hour' : 'day'
  
  data.forEach(item => {
    const date = new Date(item.updated_at)
    let key
    
    if (interval === 'hour') {
      key = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours())
    } else {
      key = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }
    
    if (!groups[key]) {
      groups[key] = {
        date: key,
        total_quantity: 0,
        low_stock_count: 0
      }
    }
    
    groups[key].total_quantity += item.quantity
    if (item.quantity < 10) {
      groups[key].low_stock_count++
    }
  })

  return Object.values(groups).sort((a, b) => a.date - b.date)
}

// Watch for period and category changes
watch([selectedPeriod, trendCategory], () => { fetchTrendData() })

// Fetch Data
async function fetchProducts() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) throw error
    products.value = data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось загрузить данные',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

// Modified onMounted
onMounted(() => {
  fetchProducts()
  fetchTrendData()
})
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: #f7fafd;
}

.kpi-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.kpi-card {
  flex: 1 1 220px;
  min-width: 220px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.07);
  margin-bottom: 0;
}

.kpi-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2196F3;
  text-align: center;
  padding: 1rem;
}

.kpi-value.warning {
  color: #FFC107;
}

.charts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.chart-card {
  flex: 1 1 400px;
  min-width: 350px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.07);
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.full-width {
  flex-basis: 100%;
  min-width: 0;
}

.table-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.07);
  margin-top: 2rem;
}

:deep(.p-card-title) {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
}

:deep(.p-card-content) {
  padding: 1rem;
}

.period-filter {
  margin-bottom: 2rem;
}

.filter-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  font-weight: 500;
  color: #666;
}

:deep(.p-selectbutton) {
  .p-button {
    padding: 0.5rem 1rem;
    &.p-highlight {
      background: #2196F3;
      border-color: #2196F3;
    }
  }
}

/* Стили для пустых состояний */
.charts-grid .chart-card:empty::after {
  content: 'Нет данных для отображения';
  color: #bbb;
  font-size: 1.1rem;
  text-align: center;
}
.table-card:empty::after {
  content: 'Нет изменений для отображения';
  color: #bbb;
  font-size: 1.1rem;
  text-align: center;
  display: block;
  padding: 2rem;
}
</style> 