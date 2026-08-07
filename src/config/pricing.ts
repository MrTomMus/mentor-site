import type { PricingPlan } from '@/types'

export const pricingPlans: PricingPlan[] = [
  {
    id: 'single',
    titleKey: 'formats.plans.single.title',
    descriptionKey: 'formats.plans.single.description',
    benefitKeys: [
      'formats.plans.single.benefits.b1',
      'formats.plans.single.benefits.b2',
      'formats.plans.single.benefits.b3',
      'formats.plans.single.benefits.b4',
    ],
    durationKey: 'formats.plans.single.duration',
    price: {
      ru: '2 500 ₽',
      en: '2 500 ₽',
    },
  },
  {
    id: 'pack4',
    titleKey: 'formats.plans.pack4.title',
    descriptionKey: 'formats.plans.pack4.description',
    benefitKeys: [
      'formats.plans.pack4.benefits.b1',
      'formats.plans.pack4.benefits.b2',
      'formats.plans.pack4.benefits.b3',
      'formats.plans.pack4.benefits.b4',
    ],
    durationKey: 'formats.plans.pack4.duration',
    price: {
      ru: '9 500 ₽',
      en: '9 500 ₽',
    },
    recommended: true,
  },
  {
    id: 'pack8',
    titleKey: 'formats.plans.pack8.title',
    descriptionKey: 'formats.plans.pack8.description',
    benefitKeys: [
      'formats.plans.pack8.benefits.b1',
      'formats.plans.pack8.benefits.b2',
      'formats.plans.pack8.benefits.b3',
      'formats.plans.pack8.benefits.b4',
      'formats.plans.pack8.benefits.b5',
    ],
    durationKey: 'formats.plans.pack8.duration',
    price: {
      ru: '18 000 ₽',
      en: '18 000 ₽',
    },
  },
]
