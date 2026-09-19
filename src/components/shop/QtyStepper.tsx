import { Minus, Plus, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  qty: number
  onChange: (qty: number) => void
  size?: 'sm' | 'md'
  className?: string
  name: string
}

export function QtyStepper({ qty, onChange, size = 'md', className, name }: Props) {
  const btn = cn(
    'inline-flex items-center justify-center rounded-full text-brand-800 transition-colors hover:bg-brand-100 disabled:opacity-40',
    size === 'sm' ? 'size-8 [&_svg]:size-4' : 'size-9 [&_svg]:size-4',
  )
  return (
    <div
      className={cn('inline-flex items-center rounded-full border border-brand-200 bg-brand-50 p-0.5', className)}
      role="group"
      aria-label={`Quantity of ${name}`}
    >
      <button type="button" className={btn} onClick={() => onChange(qty - 1)} aria-label={qty === 1 ? `Remove ${name}` : `Decrease ${name} quantity`}>
        {qty === 1 ? <Trash /> : <Minus />}
      </button>
      <span className={cn('min-w-7 text-center font-bold text-ink-900 tabular', size === 'sm' ? 'text-sm' : 'text-base')} aria-live="polite">
        {qty}
      </span>
      <button type="button" className={btn} onClick={() => onChange(qty + 1)} aria-label={`Increase ${name} quantity`} disabled={qty >= 20}>
        <Plus />
      </button>
    </div>
  )
}
