<script setup lang="ts">
import { computed, ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import Button from '@/components/Button.vue'

const count = ref(0)
const double = computed(() => count.value * 2)
const increment = () => count.value++
const decrement = () => count.value--
const reset = () => (count.value = 0)

</script>

<template>
  <main>
    <TheWelcome />
    <h2>Counter</h2>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <Button
      label="My Vue Button"
      @click="() => console.log('Vue button clicked!')"
    >
      <span>ICON </span>
    </Button>

    <Button
      label="Increment"
      @click="increment"
    ></Button>
    <Button
      label="Decrement"
      @click="decrement"
    ></Button>
    <Button
      label="Reset"
      @click="reset"
    ></Button>
  </main>
</template>
