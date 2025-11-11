import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasks = defineStore('tasks', () => {
  const items = ref<string[]>([])

  function add(title: string) {
    items.value.push(title)
  }

  return { add, items }
})
