const VARIANTS = {
  primary: 'bg-espresso-900 text-cream-50 hover:bg-espresso-700 active:bg-espresso-950',
  outline: 'border border-espresso-300 text-espresso-700 hover:bg-cream-100',
  dark: 'bg-espresso-800 text-cream-50 hover:bg-espresso-700',
  light: 'bg-white text-espresso-900 hover:bg-cream-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

export default function Button({
  variant = 'primary',
  as: Component = 'button',
  className = '',
  disabled,
  ...props
}) {
  return (
    <Component
      className={`${VARIANTS[variant]} transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      {...props}
    />
  )
}
