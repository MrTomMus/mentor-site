import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Testimonial } from '@/types'
import { cn } from '@/utils/cn'

interface TestimonialCardProps {
  item: Testimonial
  className?: string
}

export function TestimonialCard({ item, className }: TestimonialCardProps) {
  const { t } = useTranslation()

  return (
    <article
      className={cn(
        'flex h-full min-h-[240px] flex-col rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-500/15 font-semibold text-accent-700 dark:text-accent-300"
          aria-hidden
        >
          {item.avatarInitials}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-ink">{item.name}</h3>
          <div
            className="mt-1 flex items-center gap-0.5"
            aria-label={t('testimonials.ratingLabel', { rating: item.rating })}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn(
                  'size-3.5',
                  i < item.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-transparent text-ink-subtle',
                )}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
        “{item.comment}”
      </blockquote>
    </article>
  )
}
