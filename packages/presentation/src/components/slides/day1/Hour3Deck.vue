<template>
  <section>
    <section data-markdown>
      <textarea data-template>
## Hour 3: Reactivity & Local State
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
### What is Reactivity?
The magic that automatically updates the UI (DOM) when your data (state) changes.
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
### State in Vue
- `ref()`: Wraps a primitive value (String, Number) in a reactive object. Access with `.value`.
- `reactive()`: Makes an entire object deeply reactive.
```js
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

function increment() {
    count.value++
}
```
In templates, `.value` is not needed: `<button>{{ count }}</button>`
      </textarea>
    </section>
      <section data-markdown>
      <textarea data-template>
### State in React
- `useState()`: The primary Hook for local state. Returns an array `[value, setValue]`.
```jsx
import { useState } from 'react'

const [count, setCount] = useState(0)
console.log(count) // 0

function increment() {
    setCount(currentCount => currentCount + 1)
}
```
The component re-renders when `setCount` is called.
      </textarea>
    </section>
  </section>
</template>

<script setup>


</script>
