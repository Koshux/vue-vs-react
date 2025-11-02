<template>
  <section class="max-w-2xl mx-auto space-y-4">
    <h1 class="text-2xl font-semibold">Task Tracker (Vue)</h1>

    <form
      @submit.prevent="handleAdd"
      class="flex gap-2"
    >
      <input
        type="text"
        v-model="title"
        placeholder="New task..."
        class="
          flex-1 rounded-xl border border-gray-300 px-3 py-2 outline-none
          focus:ring-2 focus:ring-primary/40 focus:border-primary/60
          placeholder-gray-500 dark:placeholder-gray-400
          dark:bg-gray-900 dark:border-gray-700
        "
      />
      <button
        type="submit"
        class="rounded-xl bg-primary text-white px-4 py-2 hover:opacity-90 active:opacity-80"
      >
        Add
      </button>
    </form>

    <div class="flex gap-2">
      <button
        @click="set('all')"
        :disabled="isAll"
        class="
          rounded-xl border px-3 py-1.5
          border-gray-300 text-gray-800
          hover:bg-gray-100
          dark:border-gray-700 dark:text-grayt-100 dark:hover:bg-gray-800
        "
        :class="isAll
          ? 'bg-gray-200 dark:bg-gray-700 dark:bg-gray-800 dark:text-gray-300'
          : ''
          "
      >
        All
      </button>
      <button
        @click="set('active')"
        :disabled="isActive"
        :class="isActive
          ? 'bg-gray-200 dark:bg-gray-700 dark:bg-gray-800 dark:text-gray-300'
          : ''
          "
      >
        Active
      </button>
      <button
        @click="set('done')"
        :disabled="isDone"
        :class="isDone
          ? 'bg-gray-200 dark:bg-gray-700 dark:bg-gray-800 dark:text-gray-300'
          : ''
          "
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

    <ul class="space-y-2">
      <li
        v-for="task in filteredItems"
        :key="task.id"
        class="card flex items-center gap-3"
      >
        <label class="flex-1 flex items-center gap-2">
          <input
            type="checkbox"
            :checked="task.done"
            @change="tasks.toggle(task.id)"
            class="size-4"
          />
          <span :class="{ 'line-through text-gray-800 dark:text-gray-100': task.done }">
            {{ task.title }}
          </span>
        </label>

        <select
          v-if="users.list.length"
          :value="task.assigneeId ?? ''"
          class="
            rounded-xl border border-gray-300 px-2 py-1#
            text-gray-800 dark:text-gray-100
            dark:bg-gray-900 dark:border-gray-700
          "
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
          class="opacity-70"
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
