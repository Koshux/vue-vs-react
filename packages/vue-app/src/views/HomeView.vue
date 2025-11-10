<script setup lang="ts">
// import { computed, ref } from 'vue'
import { useCounterStore } from '@/stores/counter';
import TheWelcome from '../components/TheWelcome.vue'
import Button from '@/components/Button.vue'
import DisplayCount from '@/components/DisplayCount.vue';

const store = useCounterStore()
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <h1>Home Page</h1>
    <DisplayCount />
    <h2>Counter (Pinia Store)</h2>
    <p>Count: {{ store.count }}</p>
    <p>Double: {{ store.doubleCount }}</p>
    <!-- <Button
      label="My Vue Button"
      @click="() => console.log('Vue button clicked!')"
    >
      <span>ICON </span>
    </Button> -->

    <div class="home-page__counter-buttons">
      <Button
        label="Increment"
        @click="store.increment"
      ></Button>
      <Button
        label="Decrement"
        @click="store.decrement"
      ></Button>
      <Button
        label="Reset"
        @click="store.reset"
      ></Button>
    </div>
  </main>
</template>
