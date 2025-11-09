import type React from 'react'

interface ButtonProps {
  label: string
  onClick: () => void
  children?: React.ReactNode
}

export default function Button({ children, label, onClick }: ButtonProps) {
  return (
    <button onClick={onClick}>
      {children}
      {label}
    </button>
  )
}
