export type Theme = 'light' | 'dark'

export type LocaleCode = 'ru' | 'en'

export type SupportedLocale = 'ru' | 'en'

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
  name: string
  comment: string
  rating: number
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
  profiProfileUrl: string
  privacyEmail: string
  operatorName: string
  operatorLocation: string
  siteDomain: string
  privacyEffectiveDate: string
}

export interface ContactFormData {
  name: string
  email: string
  telegram: string
  message: string
  privacyConsent: boolean
  /** Honeypot — must stay empty */
  website: string
}

export type ContactFormErrors = Partial<
  Record<keyof ContactFormData | 'contact' | 'form', string>
>

export type ConsentRecord = {
  submittedAt: string
  consentVersion: string
  consentTextId: string
  locale: SupportedLocale
  sourcePage: string
}
