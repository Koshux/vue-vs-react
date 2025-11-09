<template>
  <!-- This parent section groups all Day 1 slides into a single vertical stack -->
  <section>
    <section>
      <h2>Day 1</h2>
      <h3>The Fundamentals: Building Components & Local State</h3>
    </section>

    <!-- D1.1 Welcome & Verify -->
    <section
      data-markdown="/slides/day1/D1-1-Welcome.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>

    <!-- D1.1A Scaffolding Overview -->
    <section
      data-markdown="/slides/day1/D1-1A-Scaffolding.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>

    <!-- D1.2 Vite in Vue & React -->
    <section
      data-markdown="/slides/day1/D1-2-Vite.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>

    <!-- D1.3 Folder Structure -->
    <section
      data-markdown="/slides/day1/D1-3-Folders.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>

    <!-- D1.4 Monorepo with pnpm -->
    <section
      data-markdown="/slides/day1/D1-4-Monorepo.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>

    <!-- D1.5 Vue SFC Basics -->
    <section
      data-markdown="/slides/day1/D1-5-VueSFC.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>

    <!-- D1.6 React FC Basics -->
    <section
      data-markdown="/slides/day1/D1-6-ReactFC.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>

    <!-- D1.7 Slots vs Children -->
    <section
      data-markdown="/slides/day1/D1-7-SlotsChildren.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>

    <!-- D1.9 Vue Local State -->
    <section
      data-markdown="/slides/day1/D1-9-VueState.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>

    <!-- D1.10 React Local State -->
    <section
      data-markdown="/slides/day1/D1-10-ReactState.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>

    <!-- D1.8 Routing Basics -->
    <section
      data-markdown="/slides/day1/D1-8-Routing.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>

    <!-- D1.11 Shared State Teaser -->
    <section
      data-markdown="/slides/day1/D1-11-SharedState.md"
      data-separator="^\r?\n---\r?\n$"
    ></section>
  </section>
</template>

<script setup>
// This component now provides a single root <section> element for Reveal.js to process.
</script>
