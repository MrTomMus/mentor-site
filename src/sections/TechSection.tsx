import { useTranslation } from 'react-i18next'
import { technologies } from '@/config/technologies'
import { Container } from '@/ui/Container'
import { SectionTitle } from '@/ui/SectionTitle'
import { Reveal } from '@/ui/Reveal'

export function TechSection() {
  const { t } = useTranslation()

  return (
    <section id="tech" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="tech-title">
      <Container>
        <Reveal>
          <SectionTitle id="tech-title" title={t('tech.title')} subtitle={t('tech.subtitle')} />
        </Reveal>
        <Reveal>
          <ul className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <li
                key={tech.id}
                className="rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-500/40 hover:shadow-md"
              >
                {tech.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
