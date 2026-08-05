/**
 * Версии юридических документов и лимиты полей формы.
 */

export const PRIVACY_POLICY_VERSION = 'privacy-policy-v1' as const
export const CONSENT_TEXT_ID = 'contact-form-consent-v1' as const
export const CONSENT_VERSION = '2026-08-05' as const

export const FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  telegram: { max: 64 },
  message: { max: 2000 },
} as const

/** Minimum form fill time in ms before submit is accepted (anti-spam). */
export const MIN_FORM_FILL_MS = 2500

export const MAX_BODY_BYTES = 12_000
