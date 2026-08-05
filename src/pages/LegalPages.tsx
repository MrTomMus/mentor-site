import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { getPrivacyDocument, getConsentDocument } from '@/content/legalDocuments'
import { LegalDocumentView } from '@/components/LegalDocumentView'

function useLegalLocale(): 'ru' | 'en' {
  const { pathname } = useLocation()
  return pathname.startsWith('/en/') ? 'en' : 'ru'
}

function placeholders() {
  return {
    operatorName: siteConfig.operatorName,
    operatorLocation: siteConfig.operatorLocation,
    privacyEmail: siteConfig.privacyEmail,
    siteDomain: siteConfig.siteDomain,
    effectiveDate: siteConfig.privacyEffectiveDate,
  }
}

export function PrivacyPage() {
  const locale = useLegalLocale()
  const doc = useMemo(() => getPrivacyDocument(locale, placeholders()), [locale])
  const privacyPath = locale === 'en' ? '/en/privacy' : '/privacy'
  const consentPath = locale === 'en' ? '/en/personal-data-consent' : '/personal-data-consent'

  return (
    <LegalDocumentView
      document={doc}
      locale={locale}
      privacyPath={privacyPath}
      consentPath={consentPath}
    />
  )
}

export function ConsentPage() {
  const locale = useLegalLocale()
  const doc = useMemo(() => getConsentDocument(locale, placeholders()), [locale])
  const privacyPath = locale === 'en' ? '/en/privacy' : '/privacy'
  const consentPath = locale === 'en' ? '/en/personal-data-consent' : '/personal-data-consent'

  return (
    <LegalDocumentView
      document={doc}
      locale={locale}
      privacyPath={privacyPath}
      consentPath={consentPath}
    />
  )
}
