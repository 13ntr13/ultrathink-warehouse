<template>
  <div
    :class="[
      'ultrathink-input',
      `ultrathink-input--${variant}`,
      { 'ultrathink-input--error': error },
      { 'ultrathink-input--disabled': disabled }
    ]"
  >
    <label v-if="label" class="ultrathink-input__label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
      class="ultrathink-input__field"
    />
    <span v-if="helperText" class="ultrathink-input__helper-text">{{ helperText }}</span>
  </div>
</template>

<script setup lang="ts">
import type { InputVariant, InputType } from '../../types'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  error?: boolean
  helperText?: string
  disabled?: boolean
  variant: InputVariant
  type: InputType
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  error: false,
  helperText: '',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.ultrathink-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ultrathink-input__label {
  font-size: 14px;
  color: #666;
}

.ultrathink-input__field {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.ultrathink-input__field:focus {
  outline: none;
  border-color: #1976d2;
}

.ultrathink-input--error .ultrathink-input__field {
  border-color: #d32f2f;
}

.ultrathink-input--disabled .ultrathink-input__field {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.ultrathink-input__helper-text {
  font-size: 12px;
  color: #666;
}

.ultrathink-input--error .ultrathink-input__helper-text {
  color: #d32f2f;
}
</style> 