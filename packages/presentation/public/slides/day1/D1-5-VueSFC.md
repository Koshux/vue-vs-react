D1.5: Vue SFC Basics
branch: day-1/04-vue-sfc

### Vue: The Single-File Component (SFC)

Vue's core abstraction. It co-locates the HTML, CSS, and JavaScript for a single component in one file.

- `<template>`: The component's HTML markup.
- `<script setup>`: The component's logic (Composition API). We import dependencies, define state, and write functions here.
- `<style scoped>`: The component's CSS. The `scoped` attribute ensures these styles _only_ apply to this component.

---

### Your Task

Implement `src/components/Button.vue`.

1.  It should accept a `label` prop using `defineProps`.
2.  It should emit a `click` event using `defineEmits`.
3.  Use it in your main view (`App.vue` or `HomeView.vue`).
