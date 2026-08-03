import type { ProcessStep } from '@/types'

export const processSteps: ProcessStep[] = [
  {
    id: 'intro',
    step: 1,
    titleKey: 'process.steps.intro.title',
    descriptionKey: 'process.steps.intro.description',
  },
  {
    id: 'assessment',
    step: 2,
    titleKey: 'process.steps.assessment.title',
    descriptionKey: 'process.steps.assessment.description',
  },
  {
    id: 'plan',
    step: 3,
    titleKey: 'process.steps.plan.title',
    descriptionKey: 'process.steps.plan.description',
  },
  {
    id: 'practice',
    step: 4,
    titleKey: 'process.steps.practice.title',
    descriptionKey: 'process.steps.practice.description',
  },
]
