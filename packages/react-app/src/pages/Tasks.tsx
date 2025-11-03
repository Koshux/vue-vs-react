import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  add,
  toggle,
  assign,
  setFilter,
  selectFiltered,
  selectIsAll,
  selectIsActive,
  selectIsDone,
} from '../features/tasks/tasksSlice'
import {
  fetchUsers,
  selectUsers,
  selectUsersLoaded,
  selectUsersLoading,
  selectUsersError,
  userById,
} from '../features/users/usersSlice'

export default function Tasks() {
  const dispatch = useAppDispatch()
  const filtered = useAppSelector(selectFiltered)
  const isAll = useAppSelector(selectIsAll)
  const isActive = useAppSelector(selectIsActive)
  const isDone = useAppSelector(selectIsDone)

  const users = useAppSelector(selectUsers)
  const usersLoaded = useAppSelector(selectUsersLoaded)
  const usersLoading = useAppSelector(selectUsersLoading)
  const usersError = useAppSelector(selectUsersError)

  const [title, setTitle] = useState('')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const v = title.trim()
    if (!v) return
    dispatch(add(v))
    setTitle('')
  }

  const nameOf = (id: number | null | undefined) =>
    id == null
      ? 'Unassigned'
      : ((userById(id) as any)((window as any).reduxState ?? {})?.name ?? `User #${id}`)

  return (
    <section className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Task Tracker (React)</h1>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task…"
          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 outline-none
                     focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                     placeholder-gray-500 dark:placeholder-gray-400
                     text-[rgb(var(--v-theme-on-surface))] dark:bg-gray-900 dark:border-gray-700"
        />
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 text-white px-4 py-2 hover:opacity-90 active:opacity-80"
        >
          Add
        </button>
      </form>

      <div className="flex gap-2">
        <button
          onClick={() => dispatch(setFilter('all'))}
          disabled={isAll}
          className={`rounded-xl border px-3 py-1.5 border-gray-300 dark:border-gray-700
                      ${isAll ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter('active'))}
          disabled={isActive}
          className={`rounded-xl border px-3 py-1.5 border-gray-300 dark:border-gray-700
                      ${isActive ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
          Active
        </button>
        <button
          onClick={() => dispatch(setFilter('done'))}
          disabled={isDone}
          className={`rounded-xl border px-3 py-1.5 border-gray-300 dark:border-gray-700
                      ${isDone ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
          Done
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(fetchUsers({}))}
          disabled={usersLoading || usersLoaded}
          title="Fetch assignees from API"
          className="rounded-xl border px-3 py-1.5"
        >
          {usersLoaded ? 'Assignees loaded' : usersLoading ? 'Loading…' : 'Load assignees'}
        </button>
        {usersError && <span className="text-red-600">{usersError}</span>}
      </div>

      <ul className="space-y-2">
        {filtered.map((task) => (
          <li key={task.id} className="card flex items-center gap-3">
            <label className="flex-1 flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => dispatch(toggle(task.id))}
                className="size-4"
              />
              <span className={task.done ? 'line-through text-gray-800 dark:text-gray-100' : ''}>
                {task.title}
              </span>
            </label>

            {users.length ? (
              <select
                value={task.assigneeId ?? ''}
                onChange={(e) =>
                  dispatch(
                    assign({ id: task.id, userId: e.target.value ? Number(e.target.value) : null }),
                  )
                }
                className="rounded-xl border border-gray-300 px-2 py-1
                           text-[rgb(var(--v-theme-on-surface))] dark:bg-gray-900 dark:border-gray-700"
              >
                <option value="">Unassigned</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            ) : (
              <small className="opacity-70">
                {task.assigneeId == null ? 'Unassigned' : `User #${task.assigneeId}`}
              </small>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
