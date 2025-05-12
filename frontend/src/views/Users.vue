<template>
  <div>
    <h1>Пользователи</h1>
    <p>Список пользователей (CRUD + роли и права).</p>
    <Button icon="pi pi-plus" label="Добавить пользователя" @click="openAddDialog" />
    <div style="margin-top: 1rem; display: flex; gap: 1rem; align-items: center;">
      <InputText v-model="searchQuery" placeholder="Поиск по логину" style="width: 200px;" />
      <Dropdown v-model="roleFilter" :options="roles" optionLabel="label" optionValue="value" placeholder="Фильтр по роли" style="width: 200px;" />
      <Button icon="pi pi-download" label="Экспорт CSV" @click="exportToCSV" />
    </div>
    <DataTable :value="filteredUsers" :paginator="true" :rows="10" responsiveLayout="scroll" emptyMessage="Нет пользователей" :loading="loading">
      <Column field="username" header="Логин" sortable></Column>
      <Column field="role" header="Роль" sortable></Column>
      <Column header="Права">
        <template #body="slotProps">
          <ul>
            <li v-for="(value, key) in slotProps.data.permissions" :key="key" v-if="value">
              {{ key }}
            </li>
          </ul>
        </template>
      </Column>
      <Column header="Действия">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-text p-button-sm" label="" @click="openEditDialog(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-sm" label="" severity="danger" @click="deleteUser(slotProps.data)" />
        </template>
      </Column>
    </DataTable>

    <!-- Диалог добавления/редактирования пользователя -->
    <Dialog v-model:visible="showDialog" :header="dialogMode === 'add' ? 'Добавить пользователя' : 'Редактировать пользователя'" :modal="true" :closable="true" :style="{ width: '400px' }">
      <form @submit.prevent="saveUser">
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="username">Логин (имя пользователя)</label>
          <InputText id="username" v-model="form.username" required autofocus />
        </div>
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="password"> Пароль (оставьте пустым, если не меняете) </label>
          <InputText id="password" v-model="form.password" type="password" :required="dialogMode === 'add'" />
        </div>
        <div class="p-field" style="margin-bottom: 1rem;">
          <label for="role"> Роль (выберите роль) </label>
          <Dropdown id="role" v-model="form.role" :options="roles" optionLabel="label" optionValue="value" placeholder="Выберите роль" required />
        </div>
        <div class="p-field" style="margin-bottom: 1rem;">
          <label> Права (отметьте права) </label>
          <div v-for="(value, key) in form.permissions" :key="key" style="margin-top: 0.5rem;">
            <Checkbox :binary="true" v-model="form.permissions[key]" :label="key" />
        </div>
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
import { ref, onMounted, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { supabase } from '../supabase'

const users = ref([])
const loading = ref(false)
const showDialog = ref(false)
const dialogMode = ref('add') // 'add' или 'edit'
const editId = ref(null)
const toast = useToast()

const searchQuery = ref('')
const roleFilter = ref(null)

const roles = [
  { label: 'Администратор', value: 'admin' },
  { label: 'Пользователь', value: 'user' }
]

const form = ref({ username: '', password: '', role: '', permissions: { can_edit_users: false, can_delete_users: false } })

onMounted(async () => {
  await fetchUsers()
})

async function fetchUsers() {
  loading.value = true
  const { data, error } = await supabase.from('users').select('*')
  if (data) {
    users.value = data
  } else {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить пользователей', life: 4000 })
  }
  loading.value = false
}

const filteredUsers = computed(() => {
  let result = users.value
  if (searchQuery.value) {
    result = result.filter(u => u.username.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }
  if (roleFilter.value) {
    result = result.filter(u => u.role === roleFilter.value)
  }
  return result
})

function openAddDialog() {
  dialogMode.value = 'add'
  form.value = { username: '', password: '', role: '', permissions: { can_edit_users: false, can_delete_users: false } }
  showDialog.value = true
}

function openEditDialog(user) {
  dialogMode.value = 'edit'
  editId.value = user.id
  form.value = { username: user.username, password: '', role: user.role, permissions: { ...user.permissions } }
  showDialog.value = true
}

async function saveUser() {
  if (!form.value.username || (dialogMode.value === 'add' && !form.value.password) || !form.value.role) return
  loading.value = true
  const payload = { username: form.value.username, role: form.value.role, permissions: form.value.permissions }
  if (dialogMode.value === 'add' || (dialogMode.value === 'edit' && form.value.password)) {
    payload.password = form.value.password
  }
  if (dialogMode.value === 'add') {
    const { error } = await supabase.from('users').insert([payload])
    if (error) {
      toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось добавить пользователя', life: 4000 })
    } else {
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Пользователь добавлен', life: 3000 })
      await fetchUsers()
    }
  } else if (dialogMode.value === 'edit') {
    const { error } = await supabase.from('users').update(payload).eq('id', editId.value)
    if (error) {
      toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось обновить пользователя', life: 4000 })
    } else {
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Пользователь обновлён', life: 3000 })
      await fetchUsers()
    }
  }
  loading.value = false
  showDialog.value = false
}

async function deleteUser(user) {
  if (confirm(`Удалить пользователя "${user.username}"?`)) {
    loading.value = true
    const { error } = await supabase.from('users').delete().eq('id', user.id)
    if (error) {
      toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить пользователя', life: 4000 })
    } else {
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Пользователь удалён', life: 3000 })
      await fetchUsers()
    }
    loading.value = false
  }
}

function exportToCSV() {
  const csvHeader = 'Логин,Роль,Права\n'
  const csvContent = filteredUsers.value.map(u => {
    const permissions = Object.entries(u.permissions).filter(([, v]) => v).map(([k]) => k).join(';')
    return `${u.username},${u.role},${permissions}`
  }).join('\n')
  const csv = csvHeader + csvContent
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'users.csv')
  document.body.appendChild(link)
  link.click()
  link.remove()
}

</script>

<style>
.p-field label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
</style> 