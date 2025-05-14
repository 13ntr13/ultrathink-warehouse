<template>
  <div class="shared-components">
    <h1>Shared Components Demo</h1>

    <section class="section">
      <h2>Buttons</h2>
      <div class="component-grid">
        <VueButton variant="primary">Primary Button</VueButton>
        <VueButton variant="secondary">Secondary Button</VueButton>
        <VueButton variant="text">Text Button</VueButton>
      </div>
    </section>

    <section class="section">
      <h2>Inputs</h2>
      <div class="component-grid">
        <VueInput
          v-model="inputValue"
          label="Outlined Input"
          placeholder="Enter text..."
          variant="outlined"
        />
        <VueInput
          v-model="inputValue2"
          label="Filled Input"
          placeholder="Enter text..."
          variant="filled"
        />
        <VueInput
          v-model="inputValue3"
          label="Standard Input"
          placeholder="Enter text..."
          variant="standard"
          error="This field is required"
        />
      </div>
    </section>

    <section class="section">
      <h2>Cards</h2>
      <div class="component-grid">
        <VueCard elevation="1">
          <h3>Card with Elevation 1</h3>
          <p>This is a basic card with light shadow.</p>
        </VueCard>
        <VueCard elevation="2">
          <h3>Card with Elevation 2</h3>
          <p>This card has a medium shadow.</p>
        </VueCard>
        <VueCard elevation="3">
          <h3>Card with Elevation 3</h3>
          <p>This card has a strong shadow.</p>
        </VueCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueButton, VueInput, VueCard } from '@ultrathink/shared-ui'

const inputValue = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
</script>

<style scoped>
.shared-components {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.component-grid > * {
  min-width: 0;
}
</style> 