<template>
  <!-- Hour 1 -->
  <section>
    <section data-markdown>
      <textarea data-template>
        ## Hour 1: Project Setup & Architecture
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
        ### Build Tools: The "Why"
        - **Challenge:** Browsers don't understand Vue SFCs, JSX, TypeScript, or modern JS syntax out-of-the-box.
        - **Solution:** We need a build tool to compile, transpile, and bundle our code into standard HTML, CSS, and JS.
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
        ### The Old Way vs. The New Way
        <div class="d-flex">
            <div class="col">
                <h4>Legacy (webpack-based)</h4>
                - Vue CLI
                - Create React App (CRA)
                - **Process:** Bundles the *entire app* before starting.
                - **Result:** Slower dev server start, slower updates (HMR).
            </div>
            <div class="col">
                <h4>Modern (Native ESM)</h4>
                - **Vite**
                - **Process:** Serves files on demand using native browser ESM support.
                - **Result:** Near-instant dev server start, lightning-fast HMR.
            </div>
        </div>
      </textarea>
    </section>
      <section data-markdown>
      <textarea data-template>
        ### Monorepo Strategy
        - **What:** Managing multiple projects/packages in one single repository.
        - **Tools:** `pnpm workspaces`, Turborepo, Nx.
        - **Why?**
            - Simplified dependency management (pnpm is great for this).
            - Easy to share code (UI components, utils).
            - Consistent tooling (ESLint, Prettier).
        - **Our Structure:** `presentation`, `vue-app`, `react-app`.
      </textarea>
    </section>
  </section>

  <!-- Hour 2 -->
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
                - OOP-style (`data`, `methods`, `computed`).
                - Concerns are separated by *option*.
                - Can become hard to read in large components.
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

  <!-- Hour 3 -->
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

  <!-- Hour 4 -->
  <section>
    <section data-markdown>
      <textarea data-template>
          ## Hour 4: Derived State & User Events
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
          ### Derived State
          State that is calculated from other pieces of state.
          <br/>
          *Example: A user's full name is derived from `firstName` and `lastName`.*
      </textarea>
    </section>
      <section data-markdown>
      <textarea data-template>
          ### Derived State in Vue
          Use `computed()` for efficient, cached calculations. It only re-runs when its dependencies change.
          ```js
          import { ref, computed } from 'vue'

          const firstName = ref('John')
          const lastName = ref('Doe')

          const fullName = computed(() => {
              return `${firstName.value} ${lastName.value}`
          })
          ```
          `fullName` will update automatically if `firstName` or `lastName` changes.
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
          ### Derived State in React
          No special function needed. Just calculate it during the render. React's re-renders handle the updates.
            ```jsx
          const [firstName, setFirstName] = useState('Jane')
          const [lastName, setLastName] = useState('Doe')

          // Calculated on every render
          const fullName = `${firstName} ${lastName}`
          ```
          For expensive calculations, you can use the `useMemo` Hook.
      </textarea>
    </section>
      <section data-markdown>
      <textarea data-template>
          ### Event Handling
          <div class="d-flex">
            <div class="col">
                <h4>Vue</h4>
                - Uses the `@` directive (e.g., `@click`).
                - Simple and clean in the template.
                ```html
                <button @click="increment">
                    Click me
                </button>
                ```
            </div>
            <div class="col">
                <h4>React</h4>
                - Uses camelCase props (e.g., `onClick`).
                - The handler is passed directly.
                  ```jsx
                <button onClick={increment}>
                    Click me
                </button>
                ```
            </div>
        </div>
      </textarea>
    </section>
  </section>
</template>

<script setup>
// This component only contains the template for the slides.
// No additional script logic is needed here.
</script>
