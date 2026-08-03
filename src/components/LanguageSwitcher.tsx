import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation()
  const current = i18n.language.startsWith('en') ? 'en' : 'ru'

  const setLanguage = (lng: 'ru' | 'en') => {
    void i18n.changeLanguage(lng)
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl border border-border bg-surface-elevated p-1',
        className,
      )}
      role="group"
      aria-label={`${t('aria.languageRu')} / ${t('aria.languageEn')}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('ru')}
        className={cn(
          'rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors',
          current === 'ru'
            ? 'bg-accent-600 text-white'
            : 'text-ink-muted hover:text-ink',
        )}
        aria-label={t('aria.languageRu')}
        aria-pressed={current === 'ru'}
      >
        RU
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={cn(
          'rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors',
          current === 'en'
            ? 'bg-accent-600 text-white'
            : 'text-ink-muted hover:text-ink',
        )}
        aria-label={t('aria.languageEn')}
        aria-pressed={current === 'en'}
      >
        EN
      </button>
    </div>
  )
}
