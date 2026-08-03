import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { aboutHighlightKeys, stats } from '@/config/stats'
import { Container } from '@/ui/Container'
import { SectionTitle } from '@/ui/SectionTitle'
import { Reveal } from '@/ui/Reveal'

export function AboutSection() {
  const { t } = useTranslation()

  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="about-title">
      <Container>
        <Reveal>
          <SectionTitle id="about-title" title={t('about.title')} subtitle={t('about.subtitle')} />
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              <p>{t('about.intro')}</p>
              <p>{t('about.teaching')}</p>
            </div>

            <ul className="mt-6 space-y-3">
              {aboutHighlightKeys.map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm text-ink sm:text-base">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-700 dark:text-accent-300">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="leading-relaxed text-ink-muted">{t(key)}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
              {t('about.closing')}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="grid grid-cols-2 gap-4 sm:gap-5 lg:sticky lg:top-28 lg:grid-cols-1">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm sm:p-5"
                >
                  <dt className="text-sm text-ink-subtle">{t(stat.labelKey)}</dt>
                  <dd className="mt-1 font-display text-3xl font-bold text-accent-700 dark:text-accent-300">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
