import React, { createContext, useReducer, type Dispatch } from 'react'

type State = { count: number }
type Action = { type: 'INC' } | { type: 'DEC' } | { type: 'RESET' }

type CounterContextType = {
  state: State
  dispatch: Dispatch<Action>
}

const CounterContext = createContext<CounterContextType | undefined>(undefined)

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INC':
      return { count: state.count + 1 }
    case 'DEC':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    default:
      throw new Error('Unknown action')
  }
}

type ProviderProps = { children: React.ReactNode }

export function CounterProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  const value = React.useMemo(() => ({ state, dispatch }), [state])

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  )
}

// export the context so the hook file can use it
export { CounterContext }
export type { CounterContextType }
