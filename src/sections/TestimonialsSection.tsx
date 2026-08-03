import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { testimonials } from '@/config/testimonials'
import { siteConfig } from '@/config/site'
import { TestimonialCard } from '@/components/TestimonialCard'
import { ProfiLogo } from '@/components/ProfiLogo'
import { Container } from '@/ui/Container'
import { SectionTitle } from '@/ui/SectionTitle'
import { Reveal } from '@/ui/Reveal'
import { cn } from '@/utils/cn'

function getPerPage(width: number): number {
  if (width >= 1024) return 3
  if (width >= 768) return 2
  return 1
}

export function TestimonialsSection() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const [perPage, setPerPage] = useState(1)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const update = () => setPerPage(getPerPage(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const pageCount = Math.max(1, Math.ceil(testimonials.length / perPage))

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1))
  }, [pageCount])

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir)
      setPage(((next % pageCount) + pageCount) % pageCount)
    },
    [pageCount],
  )

  const visible = testimonials.slice(page * perPage, page * perPage + perPage)

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 py-16 sm:py-24"
      aria-labelledby="testimonials-title"
    >
      <Container>
        <Reveal>
          <SectionTitle
            id="testimonials-title"
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
          />
        </Reveal>

        <Reveal>
          <div className="relative">
            <div className="mb-5 flex items-center justify-end gap-2">
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-ink transition-colors hover:border-accent-500/40 hover:text-accent-700 disabled:opacity-40 dark:hover:text-accent-300"
                onClick={() => goTo(page - 1, -1)}
                aria-label={t('testimonials.prev')}
                disabled={pageCount <= 1}
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-ink transition-colors hover:border-accent-500/40 hover:text-accent-700 disabled:opacity-40 dark:hover:text-accent-300"
                onClick={() => goTo(page + 1, 1)}
                aria-label={t('testimonials.next')}
                disabled={pageCount <= 1}
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>

            <div className="overflow-hidden" aria-live="polite">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={`${page}-${perPage}`}
                  custom={direction}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, x: direction >= 0 ? 40 : -40 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: direction >= 0 ? -40 : 40 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'grid gap-5',
                    perPage === 1 && 'grid-cols-1',
                    perPage === 2 && 'grid-cols-2',
                    perPage === 3 && 'grid-cols-3',
                  )}
                >
                  {visible.map((item) => (
                    <TestimonialCard key={item.id} item={item} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="mt-6 flex justify-center gap-2"
              role="tablist"
              aria-label={t('testimonials.pages')}
            >
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === page}
                  aria-label={t('testimonials.page', { page: i + 1 })}
                  className={cn(
                    'h-2.5 rounded-full transition-all',
                    i === page
                      ? 'w-7 bg-accent-600'
                      : 'w-2.5 bg-border hover:bg-accent-400/60',
                  )}
                  onClick={() => goTo(i, i > page ? 1 : -1)}
                />
              ))}
            </div>

            <a
              href={siteConfig.profiProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#FF4455]/40 hover:shadow-md sm:flex-row sm:p-6"
            >
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <ProfiLogo className="h-8 w-auto text-ink" title={t('testimonials.profiLogoAlt')} />
                <p className="text-center text-sm font-medium text-ink-muted sm:text-left sm:text-base">
                  {t('testimonials.profiText')}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-xl bg-[#FF4455] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                {t('testimonials.profiCta')}
                <ExternalLink className="size-4" aria-hidden />
                <span className="sr-only">({t('aria.externalLink')})</span>
              </span>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
