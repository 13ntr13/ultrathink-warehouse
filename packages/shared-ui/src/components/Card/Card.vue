<template>
  <div 
    class="ultrathink-card" 
    :class="[`ultrathink-card--elevation-${elevation}`]"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Elevation } from '../../types'

defineProps<{
  elevation?: Elevation
}>()
</script>

<style scoped>
.ultrathink-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.ultrathink-card--elevation-0 {
  box-shadow: none;
}

.ultrathink-card--elevation-1 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ultrathink-card--elevation-2 {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ultrathink-card--elevation-3 {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.ultrathink-card--elevation-4 {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
</style> 