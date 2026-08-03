export type Theme = 'light' | 'dark'

export type LocaleCode = 'ru' | 'en'

export interface NavItem {
  id: string
  href: string
  labelKey: string
}

export interface SocialLink {
  id: string
  labelKey: string
  href: string
  external?: boolean
}

export interface StatItem {
  id: string
  value: string
  labelKey: string
}

export interface HelpArea {
  id: string
  icon: string
  titleKey: string
  descriptionKey: string
}

export interface ProcessStep {
  id: string
  step: number
  titleKey: string
  descriptionKey: string
}

export interface PricingPlan {
  id: string
  titleKey: string
  descriptionKey: string
  benefitKeys: string[]
  durationKey: string
  /** Replace these placeholders with your real prices */
  price: {
    ru: string
    en: string
  }
  recommended?: boolean
}

export interface Technology {
  id: string
  name: string
}

export interface Testimonial {
  id: string
  nameKey: string
  roleKey: string
  textKey: string
  resultKey: string
  avatarInitials: string
}

export interface FaqItem {
  id: string
  questionKey: string
  answerKey: string
}

export interface SiteConfig {
  name: string
  shortName: string
  email: string
  role: string
  telegramUsername: string
}

export type ExperienceLevel = 'junior' | 'middle' | 'senior' | 'switcher'

export interface ContactFormData {
  name: string
  contact: string
  level: ExperienceLevel | ''
  goal: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>
