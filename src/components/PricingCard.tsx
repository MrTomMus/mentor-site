import { useTranslation } from 'react-i18next'
import type { PricingPlan } from '@/types'
import { Button } from '@/ui/Button'
import { cn } from '@/utils/cn'
import { Check } from 'lucide-react'

interface PricingCardProps {
  plan: PricingPlan
  onSelect: () => void
  className?: string
}

export function PricingCard({ plan, onSelect, className }: PricingCardProps) {
  const { t, i18n } = useTranslation()
  const isRecommended = Boolean(plan.recommended)
  const locale = i18n.language.startsWith('en') ? 'en' : 'ru'
  const price = plan.price[locale]

  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-2xl border p-6 shadow-sm transition-all duration-300',
        isRecommended
          ? 'border-accent-500/50 bg-gradient-to-b from-accent-500/10 to-surface-elevated shadow-md shadow-accent-600/10'
          : 'border-border bg-surface-elevated hover:-translate-y-1 hover:shadow-lg',
        className,
      )}
    >
      {isRecommended ? (
        <span className="absolute -top-3 left-6 rounded-full bg-accent-600 px-3 py-1 text-xs font-semibold text-white">
          {t('formats.recommended')}
        </span>
      ) : null}

      <h3 className="font-display text-xl font-bold text-ink">{t(plan.titleKey)}</h3>
      <p className="mt-2 text-sm text-ink-muted">{t(plan.descriptionKey)}</p>

      <p className="mt-5 font-display text-2xl font-bold text-ink">{price}</p>
      <p className="mt-1 text-sm text-ink-subtle">{t(plan.durationKey)}</p>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.benefitKeys.map((key) => (
          <li key={key} className="flex items-start gap-2 text-sm text-ink-muted">
            <Check className="mt-0.5 size-4 shrink-0 text-accent-600" aria-hidden />
            <span>{t(key)}</span>
          </li>
        ))}
      </ul>

      <Button
        className="mt-8"
        variant={isRecommended ? 'primary' : 'secondary'}
        fullWidth
        onClick={onSelect}
      >
        {t('formats.cta')}
      </Button>
    </article>
  )
}
