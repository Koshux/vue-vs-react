import { useEffect, useState } from 'react'
// import Button from '../components/Button'
// import { DisplayCount } from '../components/DisplayCount'
// import { useCounter } from '../hooks/useCounter'

type Pokemon = {
  name: string
  weight: number
}

export function Test() {
  // const { dispatch } = useCounter()

  const [data, setData] = useState<Pokemon>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        if (!res.ok) throw new Error('Network error')
        setData(await res.json())
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Home</h1>
      {/* <DisplayCount /> */}

      <div
        style={{ marginTop: '2rem', border: '1px solid gray', padding: '1rem' }}
      >
        <h2>Local Fetch (useEffect)</h2>
        {loading && <p>Loading Pokémon...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {data && (
          <p>
            Fetched: <strong>{data.name}</strong>
          </p>
        )}

        {/* <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button
            label="Increment"
            onClick={() => dispatch({ type: 'INC' })}
          ></Button>
          <Button
            label="Decrement"
            onClick={() => dispatch({ type: 'DEC' })}
          ></Button>
          <Button
            label="Reset"
            onClick={() => dispatch({ type: 'RESET' })}
          ></Button>
        </div> */}
      </div>
    </div>
  )
}
