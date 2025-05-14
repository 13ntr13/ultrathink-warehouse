<template>
  <div class="app">
    <h1>UltraThink Warehouse</h1>
    <div class="buttons">
      <VueButton variant="primary">Primary Button</VueButton>
      <VueButton variant="secondary">Secondary Button</VueButton>
      <VueButton variant="text">Text Button</VueButton>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { VueButton } from '@ultrathink/shared-ui'
</script>

<style scoped>
.app {
  padding: 2rem;
  text-align: center;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}
</style> 