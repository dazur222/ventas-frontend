import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'quiet'
  onClick?: () => void
  icon?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  title?: string
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  icon,
  type = 'button',
  disabled = false,
  title,
}: ButtonProps) {
  return <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`button button-${variant}`}
  >
    {icon}{children}
  </button>
}
