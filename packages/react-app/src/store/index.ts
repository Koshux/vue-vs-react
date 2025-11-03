import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice'
import usersReducer from '../features/users/usersSlice'
import { createPersistor } from './persist'

const persistor = createPersistor<{
  tasks: { items: unknown; currentFilter: unknown }
}>({
  key: 'redux-react-app',
  version: 2,
  paths: ['tasks'], // we'll persist subset inside slice
})

const preloaded = persistor.load()

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
  preloadedState: preloaded as any,
})

store.subscribe(() => {
  const s = store.getState()
  // only keep items + currentFilter from tasks slice
  const minimal = {
    tasks: {
      items: s.tasks.items,
      currentFilter: s.tasks.currentFilter,
    },
  }
  persistor.save(minimal as any)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
