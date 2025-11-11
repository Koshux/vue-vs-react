import { useState } from 'react'
import { add, selectTasks } from '../features/tasks/tasksSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import Button from '../components/Button'

export default function TasksView() {
  const dispatch = useAppDispatch()

  // 1. Get state with selector
  const items = useAppSelector(selectTasks)

  // 2. Local state for the form input
  const [title, setTitle] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = title.trim()
    if (!value) return
    dispatch(add(value))
    setTitle('')
  }

  return (
    <section>
      <h1>Task Tracker (React)</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title..."
        />
        <Button type="submit" label="Add" />
      </form>

      <ul>
        {items.map((task, i) => (
          <li key={i}>{task}</li>
        ))}
      </ul>
    </section>
  )
}
