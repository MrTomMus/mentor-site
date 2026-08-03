import { useTranslation } from 'react-i18next'
import { ArrowRight, Code2, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { Badge } from '@/ui/Badge'
import { scrollToId } from '@/utils/scroll'

interface HeroSectionProps {
  onBook: () => void
}

export function HeroSection({ onBook }: HeroSectionProps) {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()

  const badges = [
    t('hero.badges.html'),
    t('hero.badges.css'),
    t('hero.badges.javascript'),
    t('hero.badges.react'),
    t('hero.badges.practice'),
    t('hero.badges.interviews'),
  ]

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16" aria-labelledby="hero-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.p
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-semibold text-accent-700 dark:text-accent-300"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Sparkles className="size-3.5" aria-hidden />
              {t('hero.eyebrow')}
            </motion.p>

            <motion.h1
              id="hero-title"
              className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Button size="lg" onClick={onBook}>
                {t('hero.ctaPrimary')}
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => scrollToId('#about')}>
                {t('hero.ctaSecondary')}
              </Button>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {badges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-md"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            aria-hidden
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent-400/30 via-accent-600/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated p-6 shadow-xl shadow-accent-900/10">
              <div className="mb-4 flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs text-ink-subtle">mentor.session.tsx</span>
              </div>
              <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 text-left text-[12px] leading-6 text-slate-200 sm:text-[13px]">
                <code>
                  <span className="text-violet-300">const</span> growth = {'{\n'}
                  {'  '}stack: [
                  <span className="text-emerald-300">&apos;HTML&apos;</span>,{' '}
                  <span className="text-emerald-300">&apos;CSS&apos;</span>,{' '}
                  <span className="text-emerald-300">&apos;JS&apos;</span>,{' '}
                  <span className="text-emerald-300">&apos;React&apos;</span>
                  ],{'\n'}
                  {'  '}focus: <span className="text-emerald-300">&apos;practice&apos;</span>,{'\n'}
                  {'  '}goal: <span className="text-emerald-300">&apos;confidence&apos;</span>,{'\n'}
                  {'}'};{'\n\n'}
                  <span className="text-violet-300">await</span> mentor.guide(growth);
                </code>
              </pre>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-surface-muted/70 p-3">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-600 text-white">
                  <Code2 className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{t('hero.visualTitle')}</p>
                  <p className="text-xs text-ink-subtle">{t('hero.visualSubtitle')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
