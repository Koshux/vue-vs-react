<!-- <template>
  <Hour1Deck />
  <Hour2Deck />
  <Hour3Deck />
  <Hour4Deck />
</template>

<script setup>
import Hour1Deck from './day1/Hour1Deck.vue'
import Hour2Deck from './day1/Hour2Deck.vue'
import Hour3Deck from './day1/Hour3Deck.vue'
import Hour4Deck from './day1/Hour4Deck.vue'

// This component only contains the template for the slides.
// No additional script logic is needed here.
</script> -->
<template>
  <!-- This parent section groups all Day 1 slides into a single vertical stack -->
  <section>
    <!-- D1.1 Welcome & Verify -->
    <section data-markdown="/slides/day1/D1-1-Welcome.md" data-separator="^\r?\n---\r?\n$"></section>

    <!-- D1.2 Vite in Vue & React -->
    <section data-markdown="/slides/day1/D1-2-Vite.md"></section>

    <!-- D1.3 Folder Structure -->
    <section data-markdown="/slides/day1/D1-3-Folders.md"></section>

    <!-- D1.4 Monorepo with pnpm -->
    <section data-markdown="/slides/day1/D1-4-Monorepo.md"></section>

    <!-- D1.5 Vue SFC Basics -->
    <section data-markdown="/slides/day1/D1-5-VueSFC.md"></section>

    <!-- D1.6 React FC Basics -->
    <section data-markdown="/slides/day1/D1-6-ReactFC.md"></section>

    <!-- D1.7 Slots vs Children -->
    <section data-markdown="/slides/day1/D1-7-SlotsChildren.md"></section>

    <!-- D1.8 Routing Basics -->
    <section data-markdown="/slides/day1/D1-8-Routing.md"></section>

    <!-- D1.9 Vue Local State -->
    <section data-markdown="/slides/day1/D1-9-VueState.md"></section>

    <!-- D1.10 React Local State -->
    <section data-markdown="/slides/day1/D1-10-ReactState.md"></section>

    <!-- D1.11 Shared State Teaser -->
    <section data-markdown="/slides/day1/D1-11-SharedState.md"></section>
  </section>
</template>

<script setup>
// This component now provides a single root <section> element for Reveal.js to process.
</script>

