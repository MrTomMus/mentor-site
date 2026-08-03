import { useTranslation } from 'react-i18next'
import { pricingPlans } from '@/config/pricing'
import { PricingCard } from '@/components/PricingCard'
import { Container } from '@/ui/Container'
import { SectionTitle } from '@/ui/SectionTitle'
import { Reveal } from '@/ui/Reveal'

interface FormatsSectionProps {
  onBook: () => void
}

export function FormatsSection({ onBook }: FormatsSectionProps) {
  const { t } = useTranslation()

  return (
    <section id="formats" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="formats-title">
      <Container>
        <Reveal>
          <SectionTitle
            id="formats-title"
            title={t('formats.title')}
            subtitle={t('formats.subtitle')}
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 0.06}>
              <PricingCard plan={plan} onSelect={onBook} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
