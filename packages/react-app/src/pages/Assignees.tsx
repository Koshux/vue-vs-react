import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  fetchUsers,
  selectUsers,
  selectUsersError,
  selectUsersLoading,
} from '../features/users/usersSlice'
import { useEffect } from 'react'

export default function Assignees() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)
  const loading = useAppSelector(selectUsersLoading)
  const error = useAppSelector(selectUsersError)

  useEffect(() => {
    dispatch(fetchUsers({}))
  }, [dispatch])

  return (
    <section className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Assignees</h1>

      <div className="flex items-center gap-3">
        <button
          className="rounded-xl border px-3 py-1.5"
          onClick={() => dispatch(fetchUsers({ force: true }))}
          disabled={loading}
        >
          {loading ? 'Loading…' : 'Load Assignees'}
        </button>
        {error && <span className="text-red-600">{error}</span>}
      </div>

      <ul className="space-y-2">
        {users.map((u) => (
          <li key={u.id} className="card flex items-center gap-3">
            <span className="font-mono w-10 text-center">{u.id}</span>
            <span>{u.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
