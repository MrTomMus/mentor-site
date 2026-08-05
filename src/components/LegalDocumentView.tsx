import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { LegalDocument } from '@/content/legalDocuments'
import { Container } from '@/ui/Container'
import { siteConfig } from '@/config/site'

interface LegalDocumentPageProps {
  document: LegalDocument
  locale: 'ru' | 'en'
  privacyPath: string
  consentPath: string
}

export function LegalDocumentView({
  document,
  locale,
  privacyPath,
  consentPath,
}: LegalDocumentPageProps) {
  const { i18n, t } = useTranslation()

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale)
    }
  }, [i18n, locale])

  useEffect(() => {
    const previousTitle = window.document.title
    window.document.title = `${document.title} — ${siteConfig.name}`

    const meta = window.document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content') ?? null
    if (meta) meta.setAttribute('content', document.description)

    return () => {
      window.document.title = previousTitle
      if (meta && previousDescription !== null) {
        meta.setAttribute('content', previousDescription)
      }
    }
  }, [document.title, document.description])

  return (
    <div className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <p className="text-sm text-ink-subtle">
          <Link to="/" className="text-accent-700 hover:underline dark:text-accent-300">
            {t('legal.backHome')}
          </Link>
        </p>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {document.title}
        </h1>
        <p className="mt-3 text-base text-ink-muted">{document.description}</p>

        {document.notice ? (
          <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-ink-muted">
            {document.notice}
          </div>
        ) : null}

        <p className="mt-4 text-sm text-ink-subtle">
          {document.effectiveLabel}:{' '}
          <strong className="text-ink">{siteConfig.privacyEffectiveDate}</strong>
          {' · '}
          {document.versionLabel}: <strong className="text-ink">{document.versionId}</strong>
        </p>

        <nav aria-label={t('legal.toc')} className="mt-8 rounded-2xl border border-border bg-surface-elevated p-5">
          <p className="text-sm font-semibold text-ink">{t('legal.toc')}</p>
          <ol className="mt-3 space-y-2">
            {document.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-accent-700 hover:underline dark:text-accent-300"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-10">
          {document.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-display text-xl font-bold text-ink">{section.title}</h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4 border-t border-border pt-6 text-sm">
          <Link
            to={privacyPath}
            className="font-medium text-accent-700 hover:underline dark:text-accent-300"
          >
            {t('footer.privacy')}
          </Link>
          <Link
            to={consentPath}
            className="font-medium text-accent-700 hover:underline dark:text-accent-300"
          >
            {t('footer.consent')}
          </Link>
        </div>
      </Container>
    </div>
  )
}
