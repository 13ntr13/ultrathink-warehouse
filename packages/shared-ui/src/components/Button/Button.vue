<template>
  <button
    class="ultrathink-button"
    :class="[
      `ultrathink-button--${variant}`,
      { 'ultrathink-button--disabled': disabled }
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'text'
  disabled?: boolean
}>()
</script>

<style scoped>
.ultrathink-button {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  text-transform: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: none;
}

.ultrathink-button--primary {
  background-color: #1976d2;
  color: white;
}

.ultrathink-button--primary:hover {
  background-color: #1565c0;
}

.ultrathink-button--secondary {
  background-color: transparent;
  color: #1976d2;
  border: 1px solid #1976d2;
}

.ultrathink-button--secondary:hover {
  background-color: rgba(25, 118, 210, 0.04);
}

.ultrathink-button--text {
  background-color: transparent;
  color: #1976d2;
  padding: 8px;
}

.ultrathink-button--text:hover {
  background-color: rgba(25, 118, 210, 0.04);
}

.ultrathink-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 