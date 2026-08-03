import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import { Modal } from '@/ui/Modal'
import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { HelpSection } from '@/sections/HelpSection'
import { ProcessSection } from '@/sections/ProcessSection'
import { FormatsSection } from '@/sections/FormatsSection'
import { TechSection } from '@/sections/TechSection'
import { TestimonialsSection } from '@/sections/TestimonialsSection'
import { FaqSection } from '@/sections/FaqSection'
import { CtaSection } from '@/sections/CtaSection'
import { useDocumentLang } from '@/hooks/useDocumentLang'

export function HomePage() {
  const { t, i18n } = useTranslation()
  const [formOpen, setFormOpen] = useState(false)

  useDocumentLang()

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

  const openForm = useCallback(() => setFormOpen(true), [])
  const closeForm = useCallback(() => setFormOpen(false), [])

  return (
    <>
      <Header onBook={openForm} />
      <main>
        <HeroSection onBook={openForm} />
        <AboutSection />
        <HelpSection />
        <ProcessSection />
        <FormatsSection onBook={openForm} />
        <TechSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection onBook={openForm} />
      </main>
      <Footer />

      <Modal
        open={formOpen}
        onClose={closeForm}
        title={t('form.title')}
        description={t('form.description')}
      >
        <ContactForm
          key={formOpen ? 'open' : 'closed'}
          onSuccessClose={closeForm}
        />
      </Modal>
    </>
  )
}
