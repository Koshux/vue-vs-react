<template>
  <button
    @click="toggle"
    class="
      rounded-xl border px-3 py-1.5
      bg-white text-gray-800 border-gray-300
      hover:bg-gray-50
      dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800
      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
    "
    :aria-pressed="isDark"
    :title="isDark ? 'Switch to Light' : 'Switch to Dark'"
  >
    {{ isDark ? '☾ Dark' : '☀︎ Light' }}
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isDark = ref(false)
onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggle() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<style scoped></style>
