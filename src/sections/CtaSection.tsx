import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { Reveal } from '@/ui/Reveal'

interface CtaSectionProps {
  onBook: () => void
}

export function CtaSection({ onBook }: CtaSectionProps) {
  const { t } = useTranslation()

  return (
    <section className="py-16 sm:py-24" aria-labelledby="cta-title">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated px-6 py-12 text-center shadow-lg sm:px-12">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-500/20 via-transparent to-accent-700/10"
              aria-hidden
            />
            <div className="relative">
              <h2 id="cta-title" className="font-display text-3xl font-bold text-ink sm:text-4xl">
                {t('cta.title')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">
                {t('cta.description')}
              </p>
              <Button size="lg" className="mt-8" onClick={onBook}>
                {t('cta.button')}
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
