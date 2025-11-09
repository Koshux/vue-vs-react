import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'

export type User = { id: number; name: string }

type UsersState = {
  list: User[]
  loading: boolean
  error: string | null
  loaded: boolean
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
  loaded: false,
}

export const fetchUsers = createAsyncThunk<User[], { force?: boolean }, { state: RootState }>(
  'users/fetch',
  async (_, { getState }) => {
    // const res = await fetch('https://jsonplaceholder.typicode.com/users')
    // if (!res.ok) throw new Error(`HTTP ${res.status}`)
    // const data = (await res.json()) as User[]

    // --- Axios (Alternative) ---
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
    const data = res.data as User[] // axios auto-parses JSON and data is on res.data

    return data.map((u) => ({ id: u.id, name: u.name }))
  },
  {
    condition: (arg, { getState }) => {
      const { loaded, loading } = getState().users
      if (loading) return false
      if (loaded && !arg?.force) return false
      return true
    },
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.list = payload
        state.loaded = true
        state.loading = false
      })
      .addCase(fetchUsers.rejected, (state, { error }) => {
        state.error = error.message || 'Failed to load users'
        state.loading = false
      })
  },
})

export default usersSlice.reducer

export const selectUsers = (s: RootState) => s.users.list
export const selectUsersLoading = (s: RootState) => s.users.loading
export const selectUsersLoaded = (s: RootState) => s.users.loaded
export const selectUsersError = (s: RootState) => s.users.error

export const userById = (id?: number | null) => (s: RootState) => {
  return id == null ? undefined : s?.users?.list.find((u) => u.id === id)
}
