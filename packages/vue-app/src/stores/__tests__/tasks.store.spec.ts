import { describe, beforeEach, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTasks } from '../tasks'

describe('tasks store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('adds and toggles tasks, filters correctly', () => {
    const s = useTasks()
    s.add('A')
    s.add('B')
    s.add('C')

    expect(s.items.length).toBe(3)
    expect(s.filteredItems.length).toBe(3)

    const id = s.items[0]?.id
    s.toggle(id)
    s.setFilter('done')
    expect(s.filteredItems.map((t) => t.title)).toEqual(['A'])
    expect(s.filteredItems.length).toBe(1)

    s.setFilter('active')
    expect(s.filteredItems.map((t) => t.title)).toEqual(['B', 'C'])
  })
})
