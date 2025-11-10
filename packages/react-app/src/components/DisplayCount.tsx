import { useCounter } from '../hooks/useCounter'

export function DisplayCount() {
  const { state } = useCounter()

  return (
    <h3 style={{ padding: '1rem', border: '1px solid gray' }}>
      Display from Context: {state.count}
    </h3>
  )
}
