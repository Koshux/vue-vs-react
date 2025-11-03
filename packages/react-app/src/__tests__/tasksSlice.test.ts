import { describe, it, expect } from 'vitest'
import tasksReducer, {
  add,
  setFilter,
  toggle,
} from '../features/tasks/tasksSlice'

describe('tasks slice', () => {
  it('adds a task', () => {
    const state = { items: [], currentFilter: 'all' as const }
    const next = tasksReducer(state, add('Hello'))
    expect(next.items).toHaveLength(1)
    expect(next.items[0]?.title).toBe('Hello')
  })

  it('toggles a task', () => {
    const state = {
      items: [{ id: '1', title: 'Hello', done: false }],
      currentFilter: 'all' as const
    }
    const next = tasksReducer(state, toggle('1'))
    expect(next.items[0]?.done).toBe(true)
  })

  it('changes filter', () => {
    const state = { items: [], currentFilter: 'all' as const }
    const next = tasksReducer(state, setFilter('done'))
    expect(next.currentFilter).toBe('done')
  })
})
