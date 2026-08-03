import type { PricingPlan } from '@/types'

/** Replace price placeholders with your real prices */
export const pricingPlans: PricingPlan[] = [
  {
    id: 'consultation',
    titleKey: 'formats.plans.consultation.title',
    descriptionKey: 'formats.plans.consultation.description',
    benefitKeys: [
      'formats.plans.consultation.benefits.b1',
      'formats.plans.consultation.benefits.b2',
      'formats.plans.consultation.benefits.b3',
      'formats.plans.consultation.benefits.b4',
    ],
    durationKey: 'formats.plans.consultation.duration',
    price: {
      ru: '2 500 ₽',
      en: 'from $30',
    },
  },
  {
    id: 'mentorship',
    titleKey: 'formats.plans.mentorship.title',
    descriptionKey: 'formats.plans.mentorship.description',
    benefitKeys: [
      'formats.plans.mentorship.benefits.b1',
      'formats.plans.mentorship.benefits.b2',
      'formats.plans.mentorship.benefits.b3',
      'formats.plans.mentorship.benefits.b4',
    ],
    durationKey: 'formats.plans.mentorship.duration',
    price: {
      ru: 'от 15 500 ₽ / мес',
      en: 'from $190 / mo',
    },
    recommended: true,
  },
  {
    id: 'interview',
    titleKey: 'formats.plans.interview.title',
    descriptionKey: 'formats.plans.interview.description',
    benefitKeys: [
      'formats.plans.interview.benefits.b1',
      'formats.plans.interview.benefits.b2',
      'formats.plans.interview.benefits.b3',
    ],
    durationKey: 'formats.plans.interview.duration',
    price: {
      ru: 'от 10 000 ₽',
      en: 'from $120',
    },
  },
]
