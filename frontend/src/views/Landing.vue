<template>
  <div>
    <h1>Добро пожаловать, {{ roleName }}!</h1>
    <Card>
      <template #title>Статистика</template>
      <template #content>
        <ul>
          <li v-for="item in statsList" :key="item.label">{{ item.label }}: {{ item.value }}</li>
        </ul>
      </template>
    </Card>
    <div style="margin-top: 2rem;">
      <Button
        v-for="action in actions"
        :key="action.label"
        :label="action.label"
        @click="goTo(action.route)"
        style="margin-right: 1rem;"
      />
    </div>
    <div v-if="notifications.length" style="margin-top: 2rem;">
      <Card>
        <template #title>Уведомления</template>
        <template #content>
          <ul>
            <li v-for="note in notifications" :key="note">{{ note }}</li>
          </ul>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'

// Пример: роль берём из авторизации (по умолчанию – manager)
const userRole = ref('manager') // 'admin', 'manager', 'user'
const router = useRouter()

const roleName = computed(() => {
  if (userRole.value === 'admin') return 'Администратор'
  if (userRole.value === 'manager') return 'Менеджер'
  return 'Пользователь'
})

const statsList = computed(() => {
  if (userRole.value === 'admin') {
    return [
      { label: 'Товаров', value: 120 },
      { label: 'Пользователей', value: 15 },
      { label: 'Заказов', value: 34 },
      { label: 'Отчётов', value: 7 }
    ]
  }
  if (userRole.value === 'manager') {
    return [
      { label: 'Товаров', value: 120 },
      { label: 'Заказов', value: 34 },
      { label: 'Новых заявок', value: 5 }
    ]
  }
  return [
    { label: 'Доступно товаров', value: 120 },
    { label: 'Мои заказы', value: 3 }
  ]
})

const actions = computed(() => {
  if (userRole.value === 'admin') {
    return [
      { label: 'Управление пользователями', route: '/users' },
      { label: 'Управление товарами', route: '/products' },
      { label: 'Просмотр заказов', route: '/orders' },
      { label: 'Просмотр отчётов', route: '/reports' },
      { label: 'Настройки системы', route: '/settings' }
    ]
  }
  if (userRole.value === 'manager') {
    return [
      { label: 'Просмотр товаров', route: '/products' },
      { label: 'Управление заказами', route: '/orders' },
      { label: 'Создать новый заказ', route: '/order/new' },
      { label: 'Просмотр отчётов', route: '/reports' }
    ]
  }
  return [
    { label: 'Просмотр товаров', route: '/products' },
    { label: 'Создать заказ', route: '/order/new' },
    { label: 'Мои заказы', route: '/my-orders' }
  ]
})

const notifications = computed(() => {
  if (userRole.value === 'manager') {
    return ['Есть новые заказы на обработку!']
  }
  if (userRole.value === 'user') {
    return ['Ваш последний заказ готов к выдаче!']
  }
  return []
})

function goTo(route) {
  router.push(route)
}
</script> 