import { useTranslation } from 'react-i18next'
import { testimonials } from '@/config/testimonials'
import { TestimonialCard } from '@/components/TestimonialCard'
import { Container } from '@/ui/Container'
import { SectionTitle } from '@/ui/SectionTitle'
import { Reveal } from '@/ui/Reveal'

export function TestimonialsSection() {
  const { t } = useTranslation()

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
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <TestimonialCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
