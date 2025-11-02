import { ref } from 'vue'
import { defineStore } from 'pinia'

export type User = {
  id: number
  name: string
}

export const useUsers = defineStore('users', () => {
  const list = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>('')
  const loaded = ref<boolean>(false)

  async function fetchUsers(force = false) {
    if (loaded.value && !force) return
    loading.value = true
    error.value = null

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as User[]

      list.value = data.map(user => {
        return { id: user.id, name: user.name }
      })
      loaded.value = true
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load users'
    } finally {
      loading.value = false
    }
  }

  function byId(id?: number | null) {
    return id == null ? undefined : list.value.find(user => user.id === id)
  }

  return {
    byId,
    error,
    fetchUsers,
    list,
    loaded,
    loading,
  }
})
