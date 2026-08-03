import { cn } from '@/utils/cn'

interface BadgeProps {
  children: string
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-ink-muted shadow-sm',
        className,
      )}
    >
      {children}
    </span>
  )
}
