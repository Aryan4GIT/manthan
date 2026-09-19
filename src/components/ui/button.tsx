import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,box-shadow,background-color,color,filter] duration-200 ease-[var(--ease-soft)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.97]',
  {
    variants: {
      variant: {
        primary: 'shine bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-[0_8px_24px_-8px_rgb(11_107_58/0.65)] hover:brightness-110 hover:shadow-[0_12px_28px_-8px_rgb(11_107_58/0.7)] hover:-translate-y-0.5',
        accent: 'shine bg-gradient-to-b from-mango-400 to-mango-500 text-ink-900 shadow-[0_8px_24px_-8px_rgb(227_154_18/0.75)] hover:brightness-105 hover:-translate-y-0.5',
        whatsapp: 'shine bg-gradient-to-b from-[#2ee06f] to-whatsapp-dark text-white shadow-[0_8px_24px_-8px_rgb(37_211_102/0.65)] hover:brightness-105 hover:-translate-y-0.5',
        outline: 'border border-line bg-white text-ink-900 shadow-[0_1px_2px_rgb(6_61_34/0.05)] hover:border-brand-300 hover:text-brand-800 hover:-translate-y-0.5',
        glass: 'glass text-ink-900 hover:bg-white/95 hover:-translate-y-0.5',
        ghost: 'text-ink-700 hover:bg-brand-50 hover:text-brand-800',
        dark: 'bg-ink-900 text-white hover:bg-ink-700',
      },
      size: {
        sm: 'h-10 px-4 text-sm [&_svg]:size-4',
        md: 'h-11 px-5 text-sm [&_svg]:size-4',
        lg: 'h-13 px-7 text-base [&_svg]:size-5',
        icon: 'size-11 [&_svg]:size-5',
        'icon-sm': 'size-10 [&_svg]:size-5',
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
