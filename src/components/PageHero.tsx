import type { ReactNode } from 'react'

export function PageHero({ title, lead, children }: { title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div className="glow-brand absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x py-10 sm:py-14">
        <h1 className="text-4xl font-extrabold text-ink-900 sm:text-5xl lg:text-6xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">{lead}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  )
}
