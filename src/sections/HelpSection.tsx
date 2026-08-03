import { useTranslation } from 'react-i18next'
import { helpAreas } from '@/config/helpAreas'
import { MentorCard } from '@/components/MentorCard'
import { Container } from '@/ui/Container'
import { SectionTitle } from '@/ui/SectionTitle'
import { Reveal } from '@/ui/Reveal'

export function HelpSection() {
  const { t } = useTranslation()

  return (
    <section id="help" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="help-title">
      <Container>
        <Reveal>
          <SectionTitle id="help-title" title={t('help.title')} subtitle={t('help.subtitle')} />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {helpAreas.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <MentorCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
