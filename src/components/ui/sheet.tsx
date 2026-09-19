import * as SheetPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Sheet = SheetPrimitive.Root
export const SheetTrigger = SheetPrimitive.Trigger
export const SheetClose = SheetPrimitive.Close
export const SheetTitle = SheetPrimitive.Title
export const SheetDescription = SheetPrimitive.Description

interface SheetContentProps extends ComponentProps<typeof SheetPrimitive.Content> {
  side?: 'left' | 'right'
}

export function SheetContent({ side = 'right', className, children, ...props }: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-[60] bg-brand-950/40 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <SheetPrimitive.Content
        className={cn(
          'fixed inset-y-0 z-[70] flex w-[min(100%,26rem)] flex-col bg-white shadow-lift outline-none',
          side === 'right'
            ? 'right-0 rounded-l-3xl data-[state=closed]:animate-slide-out-right data-[state=open]:animate-slide-in-right'
            : 'left-0 rounded-r-3xl data-[state=closed]:animate-slide-out-left data-[state=open]:animate-slide-in-left',
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full bg-brand-50 text-ink-700 transition-colors hover:bg-brand-100 hover:text-ink-900"
          aria-label="Close"
        >
          <X className="size-5" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}
