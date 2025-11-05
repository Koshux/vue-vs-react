<template>
  <div
    class="reveal"
    ref="deckRef"
  >
    <div class="slides">
      <!-- Slide 1: Title -->
      <!-- <section data-markdown>
        <textarea data-template>
          # Vue vs React
          ### A 3-Day Workshop
          ---
          **Client:** PTL Ltd.
          <br>
          **Date:** October 20-22, 2025
        </textarea>
      </section> -->
      <IntroductionSlides />

      <section>
        <h2>Day 1</h2>
        <h3>The Fundamentals: Building Components & Local State</h3>
      </section>

      <Day1Slides />

      <section>
        <h2>Day 2</h2>
        <h3>Building Applications: State, Routing & Data</h3>
      </section>

      <Day2Slides />

      <section>
        <h2>Day 3</h2>
        <h3>The Professional Ecosystem: Tooling, Testing & Advanced Topics</h3>
      </section>

      <Day3Slides />

      <section data-markdown>
        <textarea data-template>
          ## Questions?
          <br>
          ### Thank You!
        </textarea>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'

import Reveal from 'reveal.js'
import Markdown from 'reveal.js/plugin/markdown/markdown.js'
import Highlight from 'reveal.js/plugin/highlight/highlight.js'
import IntroductionSlides from './slides/WelcomeDeck.vue'
import Day1Slides from './slides/SlidesDay1.vue'
import Day2Slides from './slides/SlidesDay2.vue'
import Day3Slides from './slides/SlidesDay3.vue'

const deckRef = ref(null)

onMounted(() => {
  // nextTick(() => {
  if (deckRef.value) {
    const deck = new Reveal(deckRef.value, {
      // embedded: true,
      // keyboardCondition: 'focused',
      hash: true,
      slideNumber: true,
      plugins: [Markdown, Highlight],
    })
    deck.initialize({
      width: 2048,
      height: 1080,
      margin: 0.04,
      center: true,

      // Bounds for smallest/largest possible scale to apply to content
      minScale: 0.2,
      maxScale: 2.0,
      markdown: {
        smartypants: true
      },
      highlight: {
        highlightOnLoad: true
      },
    })
    // Change the size of our presentation
    // document.querySelector('.reveal').style.width = '50vw';

    // // Make reveal.js aware of the size change
    // Reveal.layout();
  }
  // })
})
</script>

<style>
@import 'reveal.js/dist/reset.css';
@import 'reveal.js/dist/reveal.css';
@import 'reveal.js/dist/theme/moon.css';
@import 'reveal.js/plugin/highlight/monokai.css';

html,
body,
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Custom styles for a cleaner look */
:root {
  --r-main-font: "Inter", "sans-serif";
  --r-heading-font: "Inter", "sans-serif";
  --r-heading-text-transform: none;
}

.reveal .slides section .fragment.fade-in-then-out {
  opacity: 0;
  display: none;
}

.reveal .slides section .fragment.fade-in-then-out.current-fragment {
  opacity: 1;
  display: inline;
}

.reveal h1,
.reveal h2,
.reveal h3 {
  font-weight: 600;
}

.reveal .col {
  flex: 1;
  padding: 0 20px;
}

.reveal .d-flex {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.reveal ul {
  width: 100%;
}
</style>
