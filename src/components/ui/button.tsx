import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,box-shadow,background-color,color] duration-200 ease-[var(--ease-soft)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'shine bg-brand-700 text-white shadow-[0_8px_24px_-8px_rgb(11_107_58/0.6)] hover:bg-brand-600 hover:shadow-[0_12px_28px_-8px_rgb(11_107_58/0.65)] hover:-translate-y-0.5',
        accent: 'shine bg-mango-500 text-ink-900 shadow-[0_8px_24px_-8px_rgb(227_154_18/0.7)] hover:bg-mango-400 hover:-translate-y-0.5',
        whatsapp: 'shine bg-whatsapp text-white shadow-[0_8px_24px_-8px_rgb(37_211_102/0.6)] hover:bg-whatsapp-dark hover:-translate-y-0.5',
        outline: 'border border-line bg-white/80 text-ink-900 backdrop-blur hover:border-brand-300 hover:bg-white hover:text-brand-800',
        glass: 'glass text-ink-900 hover:bg-white/90',
        ghost: 'text-ink-700 hover:bg-brand-50 hover:text-brand-800',
        dark: 'bg-ink-900 text-white hover:bg-ink-700',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm [&_svg]:size-4',
        md: 'h-11 px-5 text-sm [&_svg]:size-4',
        lg: 'h-13 px-7 text-base [&_svg]:size-5',
        icon: 'size-11 [&_svg]:size-5',
        'icon-sm': 'size-9 [&_svg]:size-4',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, asChild = false, type, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      type={asChild ? undefined : (type ?? 'button')}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { buttonVariants }
