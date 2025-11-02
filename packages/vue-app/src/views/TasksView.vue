<template>
  <section>
    <h1>Task Tracker (Vue)</h1>

    <form
      @submit.prevent="handleAdd"
      class="tasks-form"
    >
      <input
        type="text"
        v-model="title"
        placeholder="New task..."
      />
      <button type="submit">Add</button>
    </form>

    <div class="tasks-actions">
      <button
        @click="set('all')"
        :disabled="isAll"
      >All</button>
      <button
        @click="set('active')"
        :disabled="isActive"
      >Active</button>
      <button
        @click="set('done')"
        :disabled="isDone"
      >Done</button>
    </div>

    <div class="tasks-assignee">
      <button
        @click="users.fetchUsers()"
        :disabled="users.loading || users.loaded"
        title="Fetch assignees from API"
      >
        {{
          users.loaded
            ? 'Assignees loaded'
            : (users.loading ? 'Loading...' : 'Load assignees')
        }}
      </button>
      <span
        v-if="users.error"
        class="tasks-assignee--error"
      >
        {{ users.error }}
      </span>
    </div>

    <ul class="tasks-list">
      <li
        v-for="task in filteredItems"
        :key="task.id"
        class="tasks-list--item"
      >
        <label class="tasks-list--label">
          <input
            type="checkbox"
            :checked="task.done"
            @change="tasks.toggle(task.id)"
          />
          <span :class="{ 'tasks-list--item-completed': task.done }">
            {{ task.title }}
          </span>
        </label>

        <select
          v-if="users.list.length"
          :value="task.assigneeId ?? ''"
          @change="tasks.assign(task.id, (
            $event.target as HTMLSelectElement).value
            ? Number(($event.target as HTMLSelectElement).value)
            : null
          )"
        >
          <option value="">Unassigned</option>
          <option
            v-for="user in users.list"
            :key="user.id"
            :value="user.id"
          >
            {{ user.name }}
          </option>
        </select>

        <!-- Fallback label before loading users -->
        <small
          v-else
          class="tasks-list--loader"
        >
          {{ nameOf(task.assigneeId) }}
        </small>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTasks, type Filter } from '../stores/tasks'
import { useUsers } from '../stores/users'

const tasks = useTasks()
const users = useUsers()

const { isAll, isActive, isDone, filteredItems } = storeToRefs(tasks)

const title = ref('')
function handleAdd() {
  const value = title.value.trim()

  if (!value) return

  tasks.add(value)
  title.value = ''
}

const set = (filter: Filter) => {
  tasks.setFilter(filter)
}

const nameOf = (id: number | null | undefined) => {
  return id == null ? 'Unassigned' : users.byId(id)?.name ?? `User #${id}`
}
</script>

<style scoped>
.tasks-form {
  margin-bottom: 1rem;
}

.tasks-actions {
  margin-bottom: 1rem;
}

.tasks-list--item {
  /* margin-bottom: 0.5rem; */
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tasks-list--label {
  flex: 1;
}

.tasks-list--loader {
  margin-bottom: 1rem;
  opacity: 0.7;
}

.tasks-list--item-completed {
  text-decoration: line-through;
}
</style>
