import {
  useReducer,
  // useState
} from 'react'

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }

function reducer(state: number, action: CounterAction): number {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'RESET':
      return 0
    default:
      return state
  }
}
export function Test() {
  // Basic:
  // const [count, setCount] = useState(0)
  // const increment = () => setCount((count) => count + 1)

  // Advanced:
  const [state, dispatch] = useReducer(reducer, 0)
  function handleButtonClick(type: CounterAction) {
    dispatch(type)
  }
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => handleButtonClick({ type: 'INCREMENT' })}>
        count is {state}
      </button>
      <button onClick={() => handleButtonClick({ type: 'DECREMENT' })}>
        count is {state}
      </button>
      <button onClick={() => handleButtonClick({ type: 'RESET' })}>
        count is {state}
      </button>
    </div>
  )
}
