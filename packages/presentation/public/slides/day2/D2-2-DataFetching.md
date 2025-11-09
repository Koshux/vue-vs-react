## D2.2: Basic Data Fetching (Time: 45 mins)

branch: day-2/01-data-fetching

### The Core Pattern: Native `fetch`

The goal is to fetch data when a component "mounts". We use `onMounted` (Vue) or `useEffect` (React) and store the result, loading, and error states.

<div class="d-flex">
<div class="col">
<h4>🔵 Vue: `onMounted` + `ref`</h4>

```vue
<script setup>
import { ref, onMounted } from 'vue'
const data = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    const res = await fetch('...')
    if (!res.ok) throw new Error('Network error')
    data.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>
```

</div>
<div class="col">
<h4>⚛️ React: `useEffect` + `useState`</h4>

```js
import { useState, useEffect } from 'react'

function MyComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch('...')
        if (!res.ok) throw new Error('Network error')
        setData(await res.json())
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, []) // <-- Empty array = "run on mount"
}
```

</div>
</div>

---

### Alternative: Using `axios`

`axios` is a popular library that auto-parses JSON and handles errors more cleanly.

<div class="d-flex">
<div class="col">
<h4>🔵 Vue: `axios`</h4>

```vue
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios' // 1. Import

onMounted(async () => {
  try {
    loading.value = true
    // 2. Use axios.get()
    const res = await axios.get('...')
    // 3. Data is on res.data
    data.value = res.data
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>
```

</div>

<div class="col">
<h4>⚛️ React: `axios`</h4>

```js
import { useState, useEffect } from 'react'
import axios from 'axios' // 1. Import

function MyComponent() {
  // ... states ...

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        // 2. Use axios.get()
        const res = await axios.get('...')
        // 3. Data is on res.data
        setData(res.data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
}
```

</div>
</div>
