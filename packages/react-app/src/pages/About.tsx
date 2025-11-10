import { useLoaderData } from 'react-router-dom'

type LoaderData = {
  message: string
}

export function About() {
  const data = useLoaderData() as LoaderData

  return (
    <div>
      <h1>About React</h1>
      <p>
        Data from loader: <strong>{data.message}</strong>
      </p>
    </div>
  )
}
