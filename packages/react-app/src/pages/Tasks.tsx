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
import { Button } from '@mui/material'

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

  const useUserById = (id?: number | null) => {
    return useAppSelector(userById(id))
  }

  function TaskItem({
    task,
    users,
    useUserById,
  }: {
    task: any
    users: any[]
    useUserById: (id?: number | null) => any
  }) {
    const dispatch = useAppDispatch()
    const user = useUserById(task.assigneeId)
    const taskAssigneeName = user?.name ?? nameOf(task.assigneeId)

    return (
      <li className="card flex items-center gap-3">
        <label className="flex-1 flex items-center gap-2">
          <input
            type="checkbox"
            name="done"
            checked={task.done}
            onChange={() => dispatch(toggle(task.id))}
            className="size-4"
          />
          <span className={task.done ? 'line-through text-gray-800 dark:text-gray-100' : ''}>
            {task.title}
          </span>
        </label>

        {users.length > 0 ? (
          <select
            value={task.assigneeId ?? ''}
            className="rounded-xl border border-gray-300 px-2 py-1 text-[rgb(var(--color-on-surface))] dark:bg-gray-900 dark:border-gray-700"
            onChange={(e) =>
              dispatch(
                assign({ id: task.id, userId: e.target.value ? Number(e.target.value) : null }),
              )
            }
          >
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        ) : (
          <small className="opacity-70">{taskAssigneeName}</small>
        )}
      </li>
    )
  }
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
             focus:ring-2 focus:ring-primary/40 focus:border-primary/60
             placeholder-gray-500 dark:placeholder-gray-400
             text-on-surface bg-surface dark:border-gray-700"
          data-testid="task-input"
        />
        <Button
          type="submit"
          variant="contained"
          className="rounded-xl bg-indigo-600 text-white px-4 py-2 hover:opacity-90 active:opacity-80"
        >
          Add
        </Button>
      </form>

      <div className="flex gap-2">
        <Button
          variant={isAll ? 'contained' : 'outlined'}
          onClick={() => dispatch(setFilter('all'))}
          disabled={isAll}
          className={`rounded-xl border px-3 py-1.5 border-gray-300 dark:border-gray-700
                      ${isAll ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
          All
        </Button>
        <Button
          variant={isActive ? 'contained' : 'outlined'}
          onClick={() => dispatch(setFilter('active'))}
          disabled={isActive}
          className={`rounded-xl border px-3 py-1.5 border-gray-300 dark:border-gray-700
                      ${isActive ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
          Active
        </Button>
        <Button
          variant={isDone ? 'contained' : 'outlined'}
          onClick={() => dispatch(setFilter('done'))}
          disabled={isDone}
          className={`rounded-xl border px-3 py-1.5 border-gray-300 dark:border-gray-700
                      ${isDone ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
          Done
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outlined"
          onClick={() => dispatch(fetchUsers({}))}
          disabled={usersLoading || usersLoaded}
          title="Fetch assignees from API"
          className="rounded-xl border px-3 py-1.5"
        >
          {usersLoaded ? 'Assignees loaded' : usersLoading ? 'Loading…' : 'Load assignees'}
        </Button>
        {usersError && <span className="text-red-600">{usersError}</span>}
      </div>

      <ul className="space-y-2" data-testid="task-list">
        {filtered.map((task) => (
          <TaskItem key={task.id} task={task} users={users} useUserById={useUserById} />
        ))}
      </ul>
    </section>
  )
}
