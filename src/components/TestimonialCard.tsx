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
        'flex h-full flex-col rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex size-12 items-center justify-center rounded-full bg-accent-500/15 font-semibold text-accent-700 dark:text-accent-300"
          aria-hidden
        >
          {item.avatarInitials}
        </div>
        <div>
          <h3 className="font-semibold text-ink">{t(item.nameKey)}</h3>
          <p className="text-sm text-ink-subtle">{t(item.roleKey)}</p>
        </div>
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
        “{t(item.textKey)}”
      </blockquote>

      <p className="mt-5 rounded-xl bg-accent-500/10 px-3 py-2 text-sm font-medium text-accent-800 dark:text-accent-200">
        <span className="text-ink-subtle">{t('testimonials.resultLabel')}: </span>
        {t(item.resultKey)}
      </p>
    </article>
  )
}
