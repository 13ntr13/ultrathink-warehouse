<template>
  <div style="max-width: 900px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; padding: 32px;">
    <Toast />
    <h1 style="margin-bottom: 24px;">Товары</h1>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="filter" placeholder="Поиск по названию..." />
      </span>
      <Button label="Добавить товар" icon="pi pi-plus" @click="openAddDialog" />
    </div>
    <DataTable :value="filteredProducts" :paginator="true" :rows="5" responsiveLayout="scroll" emptyMessage="Нет товаров" :loading="loading">
      <Column field="name" header="Название" sortable></Column>
      <Column field="category" header="Категория" sortable></Column>
      <Column field="stock" header="Остаток" sortable></Column>
      <Column header="Действия">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-text p-button-sm" label="" @click="openEditDialog(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-sm" label="" severity="danger" @click="deleteProduct(slotProps.data)" />
        </template>
      </Column>
    </DataTable>

    <!-- Диалог добавления/редактирования товара -->
    <Dialog v-model:visible="showDialog" :header="dialogMode === 'add' ? 'Добавить товар' : 'Редактировать товар'" :modal="true" :closable="true" :style="{ width: '350px' }">
      <form @submit.prevent="saveProduct">
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="name">Название</label>
          <InputText id="name" v-model="form.name" required autofocus />
        </div>
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="category">Категория</label>
          <Dropdown id="category" v-model="form.category" :options="categories" optionLabel="label" optionValue="value" placeholder="Выберите категорию" required />
        </div>
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="stock">Остаток</label>
          <InputText id="stock" v-model.number="form.stock" type="number" min="0" required />
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
const showDialog = ref(false)
const dialogMode = ref('add') // 'add' | 'edit'
const editId = ref(null)
const loading = ref(false)
const toast = useToast()

const products = ref([])
const categories = ref([])

onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})

async function fetchCategories() {
  const { data, error } = await supabase
    .from('products')
    .select('category')
  if (data) {
    // Получаем только уникальные категории
    const unique = [...new Set(data.map(item => item.category).filter(Boolean))]
    categories.value = unique.map(cat => ({ label: cat, value: cat }))
  } else {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить категории', life: 4000 })
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

const form = ref({ name: '', category: '', stock: 0 })

const filteredProducts = computed(() => {
  if (!filter.value) return products.value
  return products.value.filter(p => p.name.toLowerCase().includes(filter.value.toLowerCase()))
})

function openAddDialog() {
  dialogMode.value = 'add'
  form.value = { name: '', category: '', stock: 0 }
  showDialog.value = true
}

function openEditDialog(product) {
  dialogMode.value = 'edit'
  editId.value = product.id
  form.value = { name: product.name, category: product.category, stock: product.stock }
  showDialog.value = true
}

async function saveProduct() {
  if (!form.value.name || !form.value.category) return
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