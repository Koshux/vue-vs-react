<template>
  <section>
    <h1>Task Tracker (Vue)</h1>

    <form
      @submit.prevent="handleAdd"
      class=""
    >
      <input
        type="text"
        v-model="title"
        placeholder="New task title..."
      >
      <Button
        type="submit"
        label="add"
      >Add</Button>
    </form>
    <ul class="">
      <li
        v-for="(task, i) in tasks.items"
        :key="i"
        class=""
      >
        {{ task }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useTasks } from '@/stores/tasks';
import { ref } from 'vue';
import Button from '@/components/Button.vue';

const tasks = useTasks()
const title = ref('')
function handleAdd() {
  const value = title.value.trim()
  if (!value) return
  tasks.add(value)
  title.value = ''
}
</script>

<style scoped></style>
