import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useContactModal } from '@/layout/MainLayout'
import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { HelpSection } from '@/sections/HelpSection'
import { ProcessSection } from '@/sections/ProcessSection'
import { FormatsSection } from '@/sections/FormatsSection'
import { TechSection } from '@/sections/TechSection'
import { TestimonialsSection } from '@/sections/TestimonialsSection'
import { FaqSection } from '@/sections/FaqSection'
import { CtaSection } from '@/sections/CtaSection'
import { useEffect } from 'react'

export function HomePage() {
  const { t, i18n } = useTranslation()
  const { openForm } = useContactModal()

  useEffect(() => {
    document.title = t('meta.title')
    const description = t('meta.description')
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', t('meta.title'))
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta(
      'meta[property="og:locale"]',
      'content',
      i18n.language.startsWith('en') ? 'en_US' : 'ru_RU',
    )
  }, [t, i18n.language])

  const onBook = useCallback(() => openForm(), [openForm])

  return (
    <main>
      <HeroSection onBook={onBook} />
      <AboutSection />
      <HelpSection />
      <ProcessSection />
      <FormatsSection onBook={onBook} />
      <TechSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection onBook={onBook} />
    </main>
  )
}
