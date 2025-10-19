<template>
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

```vue
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
