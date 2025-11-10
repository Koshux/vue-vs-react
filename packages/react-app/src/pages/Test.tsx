import Button from '../components/Button'
import { DisplayCount } from '../components/DisplayCount'
import { useCounter } from '../hooks/useCounter'

export function Test() {
  const { state, dispatch } = useCounter()
  const double = state.count * 2

  return (
    <div>
      <h1>Home</h1>
      <DisplayCount />
      <div style={{ marginTop: '2rem' }}>
        <h2>Counter (Context)</h2>
        <p>Count: {state.count}</p>
        <p>Double: {double}</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
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
        </div>
      </div>
    </div>
  )
}
