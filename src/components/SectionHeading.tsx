import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface Props {
  title: ReactNode
  lead?: ReactNode
  action?: { to: string; label: string }
  className?: string
  light?: boolean
}

export function SectionHeading({ title, lead, action, className, light }: Props) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        <h2 className={cn('text-3xl font-bold sm:text-4xl', light ? 'text-white' : 'text-ink-900')}>{title}</h2>
        {lead && <p className={cn('mt-3 text-base leading-relaxed sm:text-lg', light ? 'text-white/75' : 'text-ink-600')}>{lead}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          className={cn(
            'group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold transition-colors',
            light ? 'text-mango-400 hover:text-mango-200' : 'text-brand-700 hover:text-brand-900',
          )}
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
