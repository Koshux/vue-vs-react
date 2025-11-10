<template>
  <h3 class="display-count-header">
    Display from Store: {{ store.count }}
  </h3>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore()
</script>

<style scoped>
.display-count-header {
  padding: 1rem;
  border: 1px solid gray;
}
</style>
