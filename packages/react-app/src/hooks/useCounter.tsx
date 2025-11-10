import { useContext } from 'react'
import { CounterContext } from '../context/CounterContext'

export function useCounter() {
  const context = useContext(CounterContext)

  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider')
  }

  return context
}
