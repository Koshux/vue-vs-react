

<template>
  <section>
    <h1>Task Tracker (Vue)</h1>

    <form @submit.prevent="handleAdd" class="tasks-form">
      <input type="text" v-model="title" placeholder="New task..." />
      <button type="submit">Add</button>
    </form>

    <div class="tasks-actions">
      <button @click="set('all')" :disabled="isAll">All</button>
      <button @click="set('active')" :disabled="isActive">Active</button>
      <button @click="set('done')" :disabled="isDone">Done</button>
    </div>

    <ul>
      <li v-for="task in filteredItems" :key="task.id">
        <label>
          <input
            type="checkbox"
            :checked="task.done"
            @change="tasks.toggle(task.id)"
          />
          <span :class="{ completed: task.done }">
            {{ task.title }}
          </span>
        </label>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTasks, type Filter } from '../stores/tasks'
const tasks = useTasks()
const title = ref('')

const {
  isAll,
  isActive,
  isDone,
  filteredItems
} = storeToRefs(tasks)

function handleAdd() {
  const value = title.value.trim()

  if (!value) return

  tasks.add(value)
  title.value = ''
}

const set = (filter: Filter) => {
  tasks.setFilter(filter)
}
</script>

<style scoped>
.tasks-form {
  margin-bottom: 1rem;
}

.completed {
  text-decoration: line-through;
}
</style>
