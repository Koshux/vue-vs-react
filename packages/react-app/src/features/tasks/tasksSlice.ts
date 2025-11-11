import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"

type TasksState = {
  items: string[]
}

const initialState: TasksState = {
  items: []
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add(state, action: PayloadAction<string>) {
      state.items.push(action.payload)
    }
  }
})

export const { add } = tasksSlice.actions
export default tasksSlice.reducer

export const selectTasks = (s: RootState) => s.tasks.items
