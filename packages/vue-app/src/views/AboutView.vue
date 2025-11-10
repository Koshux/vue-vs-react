<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div class="about-data">
      <h2>Local Fetch (onMounted)</h2>
      <p v-if="loading">Loading Pokémon...</p>
      <p
        v-else-if="error"
        class="about-data--error"
      >{{ error }}</p>
      <p v-else-if="data">
        Fetched: <strong>{{ data.name }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const data = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    loading.value = true
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    if (!res.ok) throw new Error('Network error')
    data.value = await res.json()
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.about-data {
  margin-top: 2rem;
  border: 1px solid gray;
  padding: 1rem;
}

.about-data--error {
  color: red;
}
</style>
