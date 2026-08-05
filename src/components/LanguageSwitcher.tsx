import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface LanguageSwitcherProps {
  className?: string
}

function legalPathForLocale(pathname: string, lng: 'ru' | 'en'): string | null {
  const isPrivacy = pathname === '/privacy' || pathname === '/en/privacy'
  const isConsent =
    pathname === '/personal-data-consent' || pathname === '/en/personal-data-consent'

  if (isPrivacy) return lng === 'en' ? '/en/privacy' : '/privacy'
  if (isConsent) return lng === 'en' ? '/en/personal-data-consent' : '/personal-data-consent'
  return null
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const current = i18n.language.startsWith('en') ? 'en' : 'ru'

  const setLanguage = (lng: 'ru' | 'en') => {
    const legalTarget = legalPathForLocale(location.pathname, lng)
    if (legalTarget) {
      if (legalTarget !== location.pathname) {
        navigate(legalTarget)
      }
      return
    }
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
