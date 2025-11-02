<template>
  <section class="max-w-xl mx-auto space-y-4">
    <h1 class="text-2xl font-semibold">Assignees</h1>

    <div class="flex items-center gap-3">
      <VBtn
        class="rounded-xl border px-3 py-1.5"
        @click="users.fetchUsers(true)"
        :disabled="users.loading"
      >
        {{ users.loading ? 'Loading...' : 'Load Assignees' }}
      </VBtn>
      <span
        v-if="users.error"
        class="text-red-600"
      >{{ users.error }}</span>
    </div>

    <ul class="space-y-2">
      <li
        v-for="user in users.list"
        :key="user.id"
        class="card flex items-center gap-3"
      >
        <span class="font-mono w-10 text-center">{{ user.id }}</span>
        <span>{{ user.name }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useUsers } from '@/stores/users';
import { onMounted } from 'vue';

const users = useUsers()
onMounted(() => {
  users.fetchUsers()
})
</script>
