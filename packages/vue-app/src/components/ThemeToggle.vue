<template>
  <button
    @click="toggle"
    class="
      rounded-xl border px-3 py-1.5
      bg-white text-[rgb(var(--v-theme-on-surface))] border-gray-300 hover:bg-gray-50
      dark:bg-gray-900 dark:text-[rgb(var(--v-theme-on-surface))] dark:border-gray-700 dark:hover:bg-gray-800
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
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  theme.global.name.value = isDark.value ? 'dark' : 'light'
})

function toggle() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  theme.global.name.value = isDark.value ? 'dark' : 'light'
}
</script>
