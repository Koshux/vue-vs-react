## D2.2: Basic Data Fetching (Time: 30 mins)

branch: day-2/01-data-fetching

### The Core Pattern

Before we use fancy data loaders, it's critical to understand the manual, hook-based pattern. The goal is to fetch data when a component "mounts" (is first shown).

---

### Vue: `onMounted` + `ref`

We use the `onMounted` lifecycle hook to run code once the component is added to the DOM. We store the result in a `ref`.

```vue
<script setup>
import { ref, onMounted } from 'vue'
const data = ref(null)
const loading = ref(true)

onMounted(async () => {
  const res = await fetch('...')
  data.value = await res.json()
  loading.value = false
})
</script>
```

---

### React: useEffect + useState

We use the useEffect hook with an empty dependency array ([]) to run code only once on mount. We store the result in useState.

```js
import { useState, useEffect } from 'react'

function MyComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('...')
      setData(await res.json())
      setLoading(false)
    }
    fetchData()
  }, []) // <-- Empty array means "run on mount"
}
```

---

### Your Task

In both apps, on your /about page:

1. Fetch data from the free PokéAPI (https://pokeapi.co/api/v2/pokemon/pikachu).
2. Display the Pokémon's name on the page.
3. Add a simple "Loading..." message while the request is in progress.
