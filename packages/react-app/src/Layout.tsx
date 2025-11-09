import { Link, Outlet } from 'react-router-dom'
export function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |
        <Link to="/test">Test</Link>
      </nav>

      <hr />

      <main>
        <Outlet />
      </main>
    </>
  )
}
