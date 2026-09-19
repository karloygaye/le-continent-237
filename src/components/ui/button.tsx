import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        gold: 'bg-gold text-ink hover:bg-cream',
        outline:
          'border border-cream/20 bg-transparent text-cream hover:border-gold hover:text-gold',
        ghost: 'text-cream/80 hover:text-gold',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-xs uppercase tracking-[0.18em]',
        lg: 'h-12 px-8',
      },
    },
    defaultVariants: {
      variant: 'gold',
      size: 'default',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
