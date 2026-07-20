import BackLink from './BackLink'

/*
 * Standard page header: an optional back link, a serif title, an optional
 * subtitle, and optional right-aligned actions. Shared by the vault, settings,
 * and family surfaces so every page title reads the same.
 *
 * `size` "lg" is the roomier vault treatment; "md" (default) is everything else.
 * `back` = { to, label }; `actions` = a node rendered at the right on wide screens.
 */
export default function PageHeader({ title, subtitle, back, actions, size = 'md', className = '' }) {
  const h1Size = size === 'lg' ? 'text-[32px] sm:text-[40px]' : 'text-[28px] sm:text-[36px]'
  const subSize = size === 'lg' ? 'text-[15px]' : 'text-[14px]'
  return (
    <section className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 ${className}`}>
      <div>
        {back && <BackLink to={back.to} className="mb-4">{back.label}</BackLink>}
        <h1 className={`${h1Size} font-serif font-semibold text-espresso-900 leading-tight${subtitle ? ' mb-2' : ''}`}>
          {title}
        </h1>
        {subtitle && <p className={`${subSize} text-espresso-600 leading-relaxed`}>{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2.5 shrink-0 self-start">{actions}</div>}
    </section>
  )
}
