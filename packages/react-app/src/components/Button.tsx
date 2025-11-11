import type React from 'react'

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button'
  label: string
  onClick?: () => void
  children?: React.ReactNode
}

export default function Button({
  children,
  type,
  label,
  onClick,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick}>
      {children}
      {label}
    </button>
  )
}
