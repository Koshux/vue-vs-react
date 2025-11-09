<template>
  <button @click="$emit('submit')">
    <slot /> {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{ label: string }>()
defineEmits(['submit'])
</script>
