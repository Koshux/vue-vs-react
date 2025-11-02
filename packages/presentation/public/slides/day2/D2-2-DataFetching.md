D2.2: Data Fetching

branch: day-2/01-data-fetching

Goal: Fetch external data when a component loads.

Tools: fetch (native) or axios (popular library).

Pattern: Fetch data inside a lifecycle hook.

Data Fetching in Vue

Use onMounted from the Composition API.

Store results in a ref().

<script setup>
import { ref, onMounted } from 'vue'
const data = ref(null)
onMounted(async () => {
  const res = await fetch('...')
  data.value = await res.json()
})
</script>


--

Data Fetching in React

Use useEffect with an empty dependency array [] (runs once on mount).

Store results in useState().

import { useState, useEffect } from 'react'
function MyComponent() {
  const [data, setData] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('...')
      setData(await res.json())
    }
    fetchData()
  }, []) // <-- Empty array means "run on mount"
  //...
}


Your Task

In both apps, on your /about page, fetch data from the free PokéAPI for a Pokémon (e.g., https://pokeapi.co/api/v2/pokemon/pikachu).

Display the Pokémon's name on the page.

Add a simple "Loading..." message while the request is in progress.
