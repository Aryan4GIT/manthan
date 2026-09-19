import { Link } from 'react-router-dom'
import { business } from '@/data/business'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn('size-10', className)} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="currentColor" />
      <path d="M14 27h36l-3.4 17.2a4 4 0 0 1-3.9 3.2H21.3a4 4 0 0 1-3.9-3.2z" fill="#f7b32b" />
      <path d="M24 27l6-11m10 11l-6-11" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M25 34v7m7-7v7m7-7v7" stroke="#0b6b3a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  const [first, ...rest] = business.name.split(' ')
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5', className)} aria-label={`${business.name} home`}>
      <LogoMark className={light ? 'text-white/15' : 'text-brand-700'} />
      <span className="font-display text-xl leading-none font-bold tracking-tight">
        {first}
        <span className={cn('font-semibold', light ? 'text-mango-400' : 'text-brand-700')}> {rest.join(' ')}</span>
      </span>
    </Link>
  )
}
