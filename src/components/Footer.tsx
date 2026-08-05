import { BriefcaseBusiness, Code2, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/config/site'
import { navigation } from '@/config/navigation'
import { socialLinks } from '@/config/social'
import { Container } from '@/ui/Container'
import { goToSection } from '@/utils/scroll'

const socialIcons = {
  telegram: Send,
  github: Code2,
  linkedin: BriefcaseBusiness,
} as const

export function Footer() {
  const { t, i18n } = useTranslation()
  const year = new Date().getFullYear()
  const isEn = i18n.language.startsWith('en')
  const privacyPath = isEn ? '/en/privacy' : '/privacy'
  const consentPath = isEn ? '/en/personal-data-consent' : '/personal-data-consent'

  return (
    <footer className="border-t border-border bg-surface-muted/60 py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold text-ink">
              {siteConfig.name}
              <span className="text-accent-600">.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-ink-muted">{t('footer.description')}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">{t('footer.navTitle')}</p>
            <ul className="mt-3 space-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/${item.href}`}
                    className="text-sm text-ink-muted transition-colors hover:text-accent-700 dark:hover:text-accent-300"
                    onClick={(e) => {
                      e.preventDefault()
                      goToSection(item.href)
                    }}
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">{t('footer.socialTitle')}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.id as keyof typeof socialIcons] ?? Send
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-accent-500/40 hover:text-ink"
                    >
                      <Icon className="size-4" aria-hidden />
                      {t(link.labelKey)}
                      <span className="sr-only">({t('aria.externalLink')})</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-subtle">
            © {year} {siteConfig.name}. {t('footer.rights')}
          </p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <li>
              <Link
                to={privacyPath}
                className="text-sm text-ink-muted transition-colors hover:text-accent-700 dark:hover:text-accent-300"
              >
                {t('footer.privacy')}
              </Link>
            </li>
            <li>
              <Link
                to={consentPath}
                className="text-sm text-ink-muted transition-colors hover:text-accent-700 dark:hover:text-accent-300"
              >
                {t('footer.consent')}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
