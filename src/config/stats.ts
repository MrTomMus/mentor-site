import type { StatItem } from '@/types'

export const stats: StatItem[] = [
  { id: 'experience', value: '3+', labelKey: 'about.stats.experience' },
  { id: 'reviews', value: '50+', labelKey: 'about.stats.reviews' },
  { id: 'students', value: '70+', labelKey: 'about.stats.students' },
  { id: 'consultations', value: '150+', labelKey: 'about.stats.consultations' },
]

export const aboutHighlightKeys = [
  'about.highlights.h1',
  'about.highlights.h2',
  'about.highlights.h3',
  'about.highlights.h4',
  'about.highlights.h5',
  'about.highlights.h6',
] as const
