export default function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`bg-white rounded-xl border border-espresso-250 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
