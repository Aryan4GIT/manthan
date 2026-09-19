import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const fieldClass =
  'w-full rounded-xl border border-line bg-white px-4 text-base text-ink-900 placeholder:text-ink-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 aria-invalid:border-tomato aria-invalid:ring-tomato/15 disabled:opacity-50'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input data-slot="input" className={cn(fieldClass, 'h-12', className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cn(fieldClass, 'min-h-28 py-3', className)} {...props} />
}

export function Label({ className, ...props }: ComponentProps<'label'>) {
  return <label className={cn('mb-1.5 block text-sm font-semibold text-ink-700', className)} {...props} />
}

export function FieldError({ children }: { children?: string }) {
  return children ? (
    <p role="alert" className="mt-1.5 text-sm font-medium text-tomato">
      {children}
    </p>
  ) : null
}
