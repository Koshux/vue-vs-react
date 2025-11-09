import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export type Task = {
  id: string
  title: string
  done: boolean
  assigneeId?: number | null
}

export type Filter = 'all' | 'active' | 'done'

type TasksState = {
  items: Task[]
  currentFilter: Filter
}

const initialState: TasksState = {
  items: [],
  currentFilter: 'all',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add(state, action: PayloadAction<string>) {
      state.items.push({
        id: crypto.randomUUID(),
        title: action.payload,
        done: false,
        assigneeId: null,
      })
    },
    toggle(state, action: PayloadAction<string | undefined>) {
      const t = state.items.find((i) => i.id === action.payload)
      if (t) t.done = !t.done
    },
    assign(state, action: PayloadAction<{ id: string; userId: number | null }>) {
      const t = state.items.find((i) => i.id === action.payload.id)
      if (t) t.assigneeId = action.payload.userId
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.currentFilter = action.payload
    },
  },
})

export const { add, toggle, assign, setFilter } = tasksSlice.actions
export default tasksSlice.reducer

// selectors
export const selectTasks = (s: RootState) => s.tasks.items
export const selectFilter = (s: RootState) => s.tasks.currentFilter

export const selectFiltered = createSelector([selectTasks, selectFilter], (items, filter) => {
  if (filter === 'all') return items
  return items.filter((t) => (filter === 'done' ? t.done : !t.done))
})

export const selectIsAll = (s: RootState) => s.tasks.currentFilter === 'all'
export const selectIsActive = (s: RootState) => s.tasks.currentFilter === 'active'
export const selectIsDone = (s: RootState) => s.tasks.currentFilter === 'done'
