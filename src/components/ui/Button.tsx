import type { ComponentPropsWithoutRef, ElementType } from 'react'

const VARIANTS = {
  primary: 'bg-espresso-900 text-cream-50 hover:bg-espresso-700 active:bg-espresso-950',
  outline: 'border border-espresso-300 text-espresso-700 hover:bg-cream-100',
  dark: 'bg-espresso-800 text-cream-50 hover:bg-espresso-700',
  light: 'bg-white text-espresso-900 hover:bg-cream-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
} as const

export type ButtonVariant = keyof typeof VARIANTS

type ButtonOwnProps<T extends ElementType> = {
  as?: T
  variant?: ButtonVariant
  className?: string
  disabled?: boolean
}

export type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>

export default function Button<T extends ElementType = 'button'>({
  variant = 'primary',
  as,
  className = '',
  disabled,
  ...props
}: ButtonProps<T>) {
  const Component = as ?? 'button'
  return (
    <Component
      className={`${VARIANTS[variant]} transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      {...props}
    />
  )
}
