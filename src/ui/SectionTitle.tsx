import { cn } from '@/utils/cn'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  id?: string
}

export function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className,
  id,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'mx-auto max-w-2xl text-center',
        className,
      )}
    >
      <h2 id={id} className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base text-ink-muted sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  )
}
