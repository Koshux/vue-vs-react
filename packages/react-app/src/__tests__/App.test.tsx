import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import App from '../App'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

function renderWithWrappers(ui: React.ReactNode, initialEntries = ['/']) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
    </Provider>,
  )
}

describe('App', () => {
  it('renders the tasks route (/) by default', () => {
    renderWithWrappers(<App />, ['/tasks'])

    // adjust this text to whatever your Tasks page actually shows
    expect(screen.getByText(/tasks/i)).toBeInTheDocument()
  })

  it('can render the about route', () => {
    renderWithWrappers(<App />, ['/about'])

    // adjust this if your about page text differs
    expect(screen.getByText(/about/i)).toBeInTheDocument()
  })
})
