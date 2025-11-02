import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type Task = {
  id: string;
  title: string;
  done: boolean;
}


export type Filter = 'all' | 'active' | 'done'

export const useTasks = defineStore('tasks', () => {
  const items = ref<Task[]>([])
  const currentFilter = ref<Filter>('all')

  function add(title: string) {
    items.value.push({
      id: crypto.randomUUID(),
      title,
      done: false,
    })
  }

  function toggle(id: string) {
    const task = items.value.find(item => item.id === id)

    if (task) {
      task.done = !task.done
    }
  }

  function setFilter(filter: Filter) {
    currentFilter.value = filter
  }

  const filteredItems = computed<Task[]>(() => {
    return currentFilter.value === 'all'
      ? items.value
      : items.value.filter(item => {
          return currentFilter.value === 'done' ? item.done : !item.done
        })
  })

  const isAll = computed(() => currentFilter.value === 'all')
  const isActive = computed(() => currentFilter.value === 'active')
  const isDone = computed(() => currentFilter.value === 'done')

  return {
    isAll,
    isActive,
    isDone,
    currentFilter,
    add,
    toggle,
    setFilter,
    filteredItems,
  }
})
