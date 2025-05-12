<template>
  <div style="max-width: 1100px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; padding: 32px;">
    <Toast />
    <h1 style="margin-bottom: 24px;">Товары</h1>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="filter" placeholder="Поиск по названию..." />
      </span>
      <Dropdown v-model="categoryFilter" :options="categories" optionLabel="label" optionValue="value" placeholder="Категория" style="min-width: 140px;" />
      <Dropdown v-model="brandFilter" :options="brands" optionLabel="label" optionValue="value" placeholder="Бренд" style="min-width: 120px;" />
      <span style="display: flex; gap: 0.5rem; align-items: center;">
        <InputText v-model.number="priceFrom" type="number" min="0" placeholder="Цена от" style="width: 90px;" />
        <span>-</span>
        <InputText v-model.number="priceTo" type="number" min="0" placeholder="до" style="width: 90px;" />
        <span style="color:#888; font-size:0.9em;">BYN</span>
      </span>
      <span style="display: flex; gap: 0.5rem; align-items: center;">
        <InputText v-model.number="quantityFrom" type="number" min="0" placeholder="Кол-во от" style="width: 90px;" />
        <span>-</span>
        <InputText v-model.number="quantityTo" type="number" min="0" placeholder="до" style="width: 90px;" />
      </span>
      <Button label="Добавить товар" icon="pi pi-plus" @click="openAddDialog" />
    </div>
    <DataTable :value="filteredProducts" :paginator="true" :rows="10" responsiveLayout="scroll" emptyMessage="Нет товаров" :loading="loading">
      <Column field="sku" header="SKU" sortable></Column>
      <Column field="brand" header="Бренд" sortable></Column>
      <Column field="name" header="Название" sortable></Column>
      <Column field="category" header="Категория" sortable></Column>
      <Column field="rack" header="Стеллаж" sortable></Column>
      <Column field="quantity" header="Остаток" sortable></Column>
      <Column field="price" header="Цена (BYN)" sortable>
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="created_at" header="Создано" sortable>
        <template #body="slotProps">{{ formatDate(slotProps.data.created_at) }}</template>
      </Column>
      <Column field="updated_at" header="Обновлено" sortable>
        <template #body="slotProps">{{ formatDate(slotProps.data.updated_at) }}</template>
      </Column>
      <Column header="Действия">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-text p-button-sm" label="" @click="openEditDialog(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-sm" label="" severity="danger" @click="deleteProduct(slotProps.data)" />
        </template>
      </Column>
    </DataTable>

    <!-- Диалог добавления/редактирования товара -->
    <Dialog v-model:visible="showDialog" :header="dialogMode === 'add' ? 'Добавить товар' : 'Редактировать товар'" :modal="true" :closable="true" :style="{ width: '400px' }">
      <form @submit.prevent="saveProduct">
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="sku">SKU</label>
          <InputText id="sku" v-model="form.sku" required />
        </div>
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="brand">Бренд</label>
          <InputText id="brand" v-model="form.brand" required />
        </div>
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="name">Название</label>
          <InputText id="name" v-model="form.name" required autofocus />
        </div>
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="category">Категория</label>
          <Dropdown id="category" v-model="form.category" :options="categories" optionLabel="label" optionValue="value" placeholder="Выберите категорию" required />
        </div>
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="rack">Стеллаж</label>
          <InputText id="rack" v-model="form.rack" />
        </div>
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="quantity">Остаток</label>
          <InputText id="quantity" v-model.number="form.quantity" type="number" min="0" required />
        </div>
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="price">Цена (BYN)</label>
          <InputText id="price" v-model.number="form.price" type="number" min="0" step="0.01" required />
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px;">
          <Button label="Сохранить" icon="pi pi-check" type="submit" />
          <Button label="Отмена" icon="pi pi-times" @click="showDialog = false" class="p-button-text" type="button" />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { supabase } from '../supabase'

const filter = ref('')
const categoryFilter = ref(null)
const brandFilter = ref(null)
const priceFrom = ref(null)
const priceTo = ref(null)
const quantityFrom = ref(null)
const quantityTo = ref(null)
const showDialog = ref(false)
const dialogMode = ref('add') // 'add' | 'edit'
const editId = ref(null)
const loading = ref(false)
const toast = useToast()

const products = ref([])
const categories = ref([])
const brands = ref([])

onMounted(async () => {
  await fetchCategories()
  await fetchBrands()
  await fetchProducts()
})

async function fetchCategories() {
  const { data, error } = await supabase
    .from('products')
    .select('category')
  if (data) {
    const unique = [...new Set(data.map(item => item.category).filter(Boolean))]
    categories.value = unique.map(cat => ({ label: cat, value: cat }))
  } else {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить категории', life: 4000 })
  }
}

async function fetchBrands() {
  const { data, error } = await supabase
    .from('products')
    .select('brand')
  if (data) {
    const unique = [...new Set(data.map(item => item.brand).filter(Boolean))]
    brands.value = unique.map(brand => ({ label: brand, value: brand }))
  } else {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить бренды', life: 4000 })
  }
}

async function fetchProducts() {
  loading.value = true
  const { data, error } = await supabase.from('products').select('*')
  if (data) {
    products.value = data
  } else {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить товары', life: 4000 })
  }
  loading.value = false
}

const form = ref({ sku: '', brand: '', name: '', category: '', rack: '', quantity: 0, price: 0 })

const filteredProducts = computed(() => {
  let result = products.value
  if (filter.value) {
    result = result.filter(p => p.name && p.name.toLowerCase().includes(filter.value.toLowerCase()))
  }
  if (categoryFilter.value) {
    result = result.filter(p => p.category === categoryFilter.value)
  }
  if (brandFilter.value) {
    result = result.filter(p => p.brand === brandFilter.value)
  }
  if (priceFrom.value !== null && priceFrom.value !== undefined && priceFrom.value !== '') {
    result = result.filter(p => p.price >= priceFrom.value)
  }
  if (priceTo.value !== null && priceTo.value !== undefined && priceTo.value !== '') {
    result = result.filter(p => p.price <= priceTo.value)
  }
  if (quantityFrom.value !== null && quantityFrom.value !== undefined && quantityFrom.value !== '') {
    result = result.filter(p => p.quantity >= quantityFrom.value)
  }
  if (quantityTo.value !== null && quantityTo.value !== undefined && quantityTo.value !== '') {
    result = result.filter(p => p.quantity <= quantityTo.value)
  }
  return result
})

function openAddDialog() {
  dialogMode.value = 'add'
  form.value = { sku: '', brand: '', name: '', category: '', rack: '', quantity: 0, price: 0 }
  showDialog.value = true
}

function openEditDialog(product) {
  dialogMode.value = 'edit'
  editId.value = product.id
  form.value = { sku: product.sku, brand: product.brand, name: product.name, category: product.category, rack: product.rack, quantity: product.quantity, price: product.price }
  showDialog.value = true
}

async function saveProduct() {
  if (!form.value.sku || !form.value.brand || !form.value.name || !form.value.category || form.value.price === null || form.value.price < 0) return
  loading.value = true
  if (dialogMode.value === 'add') {
    const { error } = await supabase.from('products').insert([{ ...form.value }])
    if (error) {
      toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось добавить товар', life: 4000 })
    } else {
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Товар добавлен', life: 3000 })
      await fetchProducts()
    }
  } else if (dialogMode.value === 'edit') {
    const { error } = await supabase.from('products').update({ ...form.value }).eq('id', editId.value)
    if (error) {
      toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось обновить товар', life: 4000 })
    } else {
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Товар обновлён', life: 3000 })
      await fetchProducts()
    }
  }
  loading.value = false
  showDialog.value = false
}

async function deleteProduct(product) {
  if (confirm(`Удалить товар "${product.name}"?`)) {
    loading.value = true
    const { error } = await supabase.from('products').delete().eq('id', product.id)
    if (error) {
      toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить товар', life: 4000 })
    } else {
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Товар удалён', life: 3000 })
      await fetchProducts()
    }
    loading.value = false
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('ru-BY', {
    style: 'currency',
    currency: 'BYN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}
</script>

<style>
.p-input-icon-left > .pi {
  margin-left: 0.5em;
  margin-right: 0.5em;
}
.p-field label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
}
</style> 