import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { faqItems } from '@/config/faq'
import { Accordion } from '@/ui/Accordion'
import { Container } from '@/ui/Container'
import { SectionTitle } from '@/ui/SectionTitle'
import { Reveal } from '@/ui/Reveal'

export function FaqSection() {
  const { t } = useTranslation()

  const items = useMemo(
    () =>
      faqItems.map((item) => ({
        id: item.id,
        title: t(item.questionKey),
        content: t(item.answerKey),
      })),
    [t],
  )

  return (
    <section id="faq" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="faq-title">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionTitle id="faq-title" title={t('faq.title')} subtitle={t('faq.subtitle')} />
        </Reveal>
        <Reveal>
          <Accordion items={items} />
        </Reveal>
      </Container>
    </section>
  )
}
