import { useTranslation } from 'react-i18next'
import { processSteps } from '@/config/process'
import { Container } from '@/ui/Container'
import { SectionTitle } from '@/ui/SectionTitle'
import { Reveal } from '@/ui/Reveal'

export function ProcessSection() {
  const { t } = useTranslation()

  return (
    <section id="process" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="process-title">
      <Container>
        <Reveal>
          <SectionTitle
            id="process-title"
            title={t('process.title')}
            subtitle={t('process.subtitle')}
          />
        </Reveal>

        <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.06}>
              <li className="relative h-full rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
                <span className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-accent-600 font-display text-sm font-bold text-white">
                  {step.step}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {t(step.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {t(step.descriptionKey)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
