<template>
  <table>
    <tr v-for="p in products" :key="p.sku">
      <td>{{ p.name }}</td>
      <td>{{ p.category }}</td>
      <td>{{ p.quantity }}</td>
      <td><button @click="$emit('delete', p.sku)">Удалить</button></td>
    </tr>
  </table>
</template>

<script setup>
defineProps(['products'])
defineEmits(['delete'])
</script>