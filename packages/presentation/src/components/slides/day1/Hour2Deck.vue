<template>
  <section>
    <section data-markdown>
      <textarea data-template>
## Hour 2: Component Basics
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
### Vue: Single-File Components (SFCs)
One file, three concerns.
```vue
<template>
  <!-- HTML Markup Here -->
  <h1>{{ message }}</h1>
</template>

<script setup>
  // JavaScript Logic Here
  import { ref } from 'vue'
  const message = ref('Hello Vue!')
</script>

<style scoped>
  /* CSS Styles Here */
  h1 { color: #42b983; }
</style>
```
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
### React: JSX in Functional Components
JavaScript with HTML syntax superpowers.
```jsx
// JavaScript Logic and Markup are intertwined
import { useState } from 'react';
import './styles.css'; // Styles are imported

function MyComponent() {
  const [message, setMessage] = useState('Hello React!');

  // Return HTML-like markup from a JS function
  return <h1>{message}</h1>;
}
```
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
### Vue: Options vs. Composition API
<div class="d-flex">
    <div class="col">
        <h4>Options API (Legacy)</h4>
        - OOP-style (data, methods, computed)
        - Concerns are separated by *option*
        - Can become hard to read in large components
    </div>
    <div class="col">
        <h4>Composition API (Modern)</h4>
        - Inspired by React Hooks.
        - Logic is grouped by *feature*.
        - More flexible, reusable, and TypeScript-friendly.
        - **We will use this.**
    </div>
</div>
      </textarea>
    </section>
      <section data-markdown>
      <textarea data-template>
### React: TSX & Typing Props
- **JSX:** JavaScript XML
- **TSX:** TypeScript XML
- Adding types to components makes them robust and self-documenting.
```tsx
interface GreetingProps {
    name: string;
}

function Greeting({ name }: GreetingProps) {
    return <h1>Hello, {name}!</h1>;
}
```
      </textarea>
    </section>
  </section>
</template>

<script setup>
</script>
