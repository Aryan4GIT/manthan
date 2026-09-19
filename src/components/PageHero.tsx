import type { ReactNode } from 'react'

export function PageHero({ title, lead, children }: { title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div className="glow-brand absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x py-8 sm:py-14">
        <h1 className="text-[2.4rem] leading-none font-extrabold text-ink-900 sm:text-5xl lg:text-6xl">{title}</h1>
        {lead && <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-600 sm:mt-4 sm:text-lg">{lead}</p>}
        {children && <div className="mt-5 sm:mt-6">{children}</div>}
      </div>
    </section>
  )
}
