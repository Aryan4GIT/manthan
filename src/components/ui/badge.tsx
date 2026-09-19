import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold leading-none whitespace-nowrap [&_svg]:size-3.5',
  {
    variants: {
      variant: {
        mango: 'shine bg-mango-500 text-ink-900',
        green: 'bg-brand-100 text-brand-800',
        solid: 'shine bg-brand-700 text-white',
        tomato: 'shine bg-tomato text-white',
        glass: 'glass text-ink-900',
        outline: 'border border-line bg-white text-ink-600',
      },
    },
    defaultVariants: { variant: 'green' },
  },
)

export function Badge({ className, variant, ...props }: ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}
