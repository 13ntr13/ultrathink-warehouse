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
            <template v-if="slotProps.data.role === 'admin'">
              <li v-if="slotProps.data.permissions.can_manage_users">Управление пользователями</li>
              <li v-if="slotProps.data.permissions.can_manage_products">Управление товарами</li>
              <li v-if="slotProps.data.permissions.can_manage_orders">Управление заказами</li>
              <li v-if="slotProps.data.permissions.can_view_reports">Просмотр отчётов</li>
              <li v-if="slotProps.data.permissions.can_manage_settings">Настройки системы</li>
              <li v-if="slotProps.data.permissions.can_view_logs">Просмотр логов</li>
            </template>
            <template v-else-if="slotProps.data.role === 'manager'">
              <li v-if="slotProps.data.permissions.can_view_products">Просмотр товаров</li>
              <li v-if="slotProps.data.permissions.can_process_orders">Обработка заказов</li>
              <li v-if="slotProps.data.permissions.can_create_orders">Создание заказов</li>
              <li v-if="slotProps.data.permissions.can_view_manager_reports">Просмотр отчётов</li>
            </template>
            <template v-else>
              <li v-if="slotProps.data.permissions.can_view_available_products">Просмотр товаров</li>
              <li v-if="slotProps.data.permissions.can_create_user_orders">Создание заказов</li>
              <li v-if="slotProps.data.permissions.can_view_user_orders">Просмотр своих заказов</li>
            </template>
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
          <label>Права (отметьте права)</label>
          <template v-if="form.role === 'admin'">
            <div v-for="(label, key) in adminPermissionLabels" :key="key" style="margin-top: 0.5rem;">
              <Checkbox :binary="true" v-model="form.permissions[key]" :label="label" />
            </div>
          </template>
          <template v-else-if="form.role === 'manager'">
            <div v-for="(label, key) in managerPermissionLabels" :key="key" style="margin-top: 0.5rem;">
              <Checkbox :binary="true" v-model="form.permissions[key]" :label="label" />
            </div>
          </template>
          <template v-else>
            <div v-for="(label, key) in userPermissionLabels" :key="key" style="margin-top: 0.5rem;">
              <Checkbox :binary="true" v-model="form.permissions[key]" :label="label" />
            </div>
          </template>
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
import { ref, onMounted, computed, watch } from 'vue'
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
const dialogMode = ref('add')
const editId = ref(null)
const toast = useToast()

const searchQuery = ref('')
const roleFilter = ref(null)

const roles = [
  { label: 'Администратор', value: 'admin' },
  { label: 'Менеджер', value: 'manager' },
  { label: 'Пользователь', value: 'user' }
]

// Определение прав и их меток
const adminPermissionLabels = {
  can_manage_users: 'Управление пользователями',
  can_manage_products: 'Управление товарами',
  can_manage_orders: 'Управление заказами',
  can_view_reports: 'Просмотр отчётов',
  can_manage_settings: 'Настройки системы',
  can_view_logs: 'Просмотр логов'
}

const managerPermissionLabels = {
  can_view_products: 'Просмотр товаров',
  can_process_orders: 'Обработка заказов',
  can_create_orders: 'Создание заказов',
  can_view_manager_reports: 'Просмотр отчётов'
}

const userPermissionLabels = {
  can_view_available_products: 'Просмотр товаров',
  can_create_user_orders: 'Создание заказов',
  can_view_user_orders: 'Просмотр своих заказов'
}

// Начальное состояние формы
const form = ref({
  username: '',
  password: '',
  role: '',
  permissions: {
    // Права администратора
    can_manage_users: false,
    can_manage_products: false,
    can_manage_orders: false,
    can_view_reports: false,
    can_manage_settings: false,
    can_view_logs: false,
    // Права менеджера
    can_view_products: false,
    can_process_orders: false,
    can_create_orders: false,
    can_view_manager_reports: false,
    // Права пользователя
    can_view_available_products: false,
    can_create_user_orders: false,
    can_view_user_orders: false
  }
})

// Функция установки прав по умолчанию
function setDefaultPermissions(role) {
  const defaultPermissions = {
    admin: {
      can_manage_users: true,
      can_manage_products: true,
      can_manage_orders: true,
      can_view_reports: true,
      can_manage_settings: true,
      can_view_logs: true,
      can_view_products: true,
      can_process_orders: true,
      can_create_orders: true,
      can_view_manager_reports: true,
      can_view_available_products: true,
      can_create_user_orders: true,
      can_view_user_orders: true
    },
    manager: {
      can_manage_users: false,
      can_manage_products: false,
      can_manage_orders: true,
      can_view_reports: false,
      can_manage_settings: false,
      can_view_logs: false,
      can_view_products: true,
      can_process_orders: true,
      can_create_orders: true,
      can_view_manager_reports: true,
      can_view_available_products: true,
      can_create_user_orders: true,
      can_view_user_orders: true
    },
    user: {
      can_manage_users: false,
      can_manage_products: false,
      can_manage_orders: false,
      can_view_reports: false,
      can_manage_settings: false,
      can_view_logs: false,
      can_view_products: false,
      can_process_orders: false,
      can_create_orders: false,
      can_view_manager_reports: false,
      can_view_available_products: true,
      can_create_user_orders: true,
      can_view_user_orders: true
    }
  }
  
  form.value.permissions = { ...defaultPermissions[role] }
}

// Следим за изменением роли
watch(() => form.value.role, (newRole) => {
  if (newRole) {
    setDefaultPermissions(newRole)
  }
})

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
  form.value = { 
    username: '', 
    password: '', 
    role: '', 
    permissions: { 
      can_manage_users: false,
      can_manage_products: false,
      can_manage_orders: false,
      can_view_reports: false,
      can_manage_settings: false,
      can_view_logs: false,
      can_view_products: false,
      can_process_orders: false,
      can_create_orders: false,
      can_view_manager_reports: false,
      can_view_available_products: false,
      can_create_user_orders: false,
      can_view_user_orders: false
    } 
  }
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