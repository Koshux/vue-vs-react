<template>
  <button
    :type="type"
    @click="$emit('submit')"
  >
    <slot /> {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  type?: 'button' | 'submit' | 'reset', label: string
}>()
defineEmits(['submit'])
</script>
