import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { ContactFormData, ContactFormErrors, SupportedLocale } from '@/types'
import { FIELD_LIMITS } from '@/config/consent'
import { buildTelegramRequestMessage, openTelegramChat } from '@/utils/telegram'
import { Button } from '@/ui/Button'
import { cn } from '@/utils/cn'

const initialData: ContactFormData = {
  name: '',
  email: '',
  telegram: '',
  message: '',
  privacyConsent: false,
  website: '',
}

function isLikelyEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isLikelyTelegram(value: string): boolean {
  const username = value.trim().replace(/^@/, '')
  return /^[a-zA-Z0-9_]{4,64}$/.test(username)
}

interface ContactFormProps {
  onSuccessClose?: () => void
  className?: string
}

export function ContactForm({ onSuccessClose, className }: ContactFormProps) {
  const { t, i18n } = useTranslation()
  const [data, setData] = useState<ContactFormData>(initialData)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const locale: SupportedLocale = i18n.language.startsWith('en') ? 'en' : 'ru'
  const privacyPath = locale === 'en' ? '/en/privacy' : '/privacy'
  const consentPath = locale === 'en' ? '/en/personal-data-consent' : '/personal-data-consent'

  const fieldClass =
    'w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-accent-500'

  const validate = (): ContactFormErrors => {
    const next: ContactFormErrors = {}
    const name = data.name.trim()
    const email = data.email.trim()
    const telegram = data.telegram.trim()
    const message = data.message.trim()

    if (!name) next.name = t('form.errors.nameRequired')
    else if (name.length < FIELD_LIMITS.name.min) next.name = t('form.errors.nameShort')
    else if (name.length > FIELD_LIMITS.name.max) next.name = t('form.errors.nameLong')

    if (!email && !telegram) {
      next.contact = t('form.errors.contactRequired')
    }

    if (email) {
      if (email.length > FIELD_LIMITS.email.max) next.email = t('form.errors.emailLong')
      else if (!isLikelyEmail(email)) next.email = t('form.errors.emailInvalid')
    }

    if (telegram) {
      if (telegram.length > FIELD_LIMITS.telegram.max) next.telegram = t('form.errors.telegramLong')
      else if (!isLikelyTelegram(telegram)) next.telegram = t('form.errors.telegramInvalid')
    }

    if (!message) next.message = t('form.errors.messageRequired')
    else if (message.length > FIELD_LIMITS.message.max) next.message = t('form.errors.messageLong')

    if (!data.privacyConsent) next.privacyConsent = t('form.errors.consentRequired')

    return next
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    // Honeypot: silently ignore bots
    if (data.website.trim()) {
      setSuccess(true)
      setData(initialData)
      return
    }

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    const text = buildTelegramRequestMessage(data, locale)
    openTelegramChat(text)
    setSuccess(true)
    setData(initialData)
    setSubmitting(false)
  }

  if (success) {
    return (
      <div className={cn('flex flex-col items-center py-6 text-center', className)} role="status">
        <CheckCircle2 className="size-12 text-accent-600" aria-hidden />
        <h3 className="mt-4 font-display text-xl font-bold text-ink">{t('form.successTitle')}</h3>
        <p className="mt-2 text-sm text-ink-muted">{t('form.successText')}</p>
        {onSuccessClose ? (
          <Button className="mt-6" variant="secondary" onClick={onSuccessClose}>
            {t('form.successClose')}
          </Button>
        ) : null}
      </div>
    )
  }

  return (
    <form
      className={cn('relative space-y-4', className)}
      onSubmit={onSubmit}
      noValidate
      aria-busy={submitting}
    >
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(e) => setData((prev) => ({ ...prev, website: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink">
          {t('form.fields.name')}
        </label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          maxLength={FIELD_LIMITS.name.max}
          value={data.name}
          onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
          className={cn(fieldClass, errors.name && 'border-red-500')}
          placeholder={t('form.fields.namePlaceholder')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name ? (
          <p id="contact-name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink">
          {t('form.fields.email')}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={FIELD_LIMITS.email.max}
          value={data.email}
          onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
          className={cn(fieldClass, (errors.email || errors.contact) && 'border-red-500')}
          placeholder={t('form.fields.emailPlaceholder')}
          aria-invalid={Boolean(errors.email || errors.contact)}
          aria-describedby={
            errors.email || errors.contact ? 'contact-email-error' : 'contact-contact-hint'
          }
        />
        <p id="contact-contact-hint" className="mt-1 text-xs text-ink-subtle">
          {t('form.fields.contactHint')}
        </p>
        {errors.email || errors.contact ? (
          <p id="contact-email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.email || errors.contact}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-telegram" className="mb-1.5 block text-sm font-medium text-ink">
          {t('form.fields.telegram')}
        </label>
        <input
          id="contact-telegram"
          name="telegram"
          autoComplete="username"
          maxLength={FIELD_LIMITS.telegram.max}
          value={data.telegram}
          onChange={(e) => setData((prev) => ({ ...prev, telegram: e.target.value }))}
          className={cn(fieldClass, (errors.telegram || errors.contact) && 'border-red-500')}
          placeholder={t('form.fields.telegramPlaceholder')}
          aria-invalid={Boolean(errors.telegram)}
          aria-describedby={errors.telegram ? 'contact-telegram-error' : undefined}
        />
        {errors.telegram ? (
          <p id="contact-telegram-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.telegram}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink">
          {t('form.fields.message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          maxLength={FIELD_LIMITS.message.max}
          value={data.message}
          onChange={(e) => setData((prev) => ({ ...prev, message: e.target.value }))}
          className={cn(fieldClass, 'resize-y', errors.message && 'border-red-500')}
          placeholder={t('form.fields.messagePlaceholder')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="rounded-2xl border border-border bg-surface-muted/50 p-4">
        <label htmlFor="contact-consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="contact-consent"
            name="privacyConsent"
            type="checkbox"
            checked={data.privacyConsent}
            onChange={(e) => setData((prev) => ({ ...prev, privacyConsent: e.target.checked }))}
            className="mt-1 size-4 shrink-0 rounded border-border text-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={
              errors.privacyConsent ? 'contact-consent-error contact-consent-links' : 'contact-consent-links'
            }
          />
          <span className="text-sm leading-relaxed text-ink-muted">
            <Trans
              i18nKey="form.consent.label"
              components={{
                consent: (
                  <Link
                    to={consentPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent-700 underline-offset-2 hover:underline dark:text-accent-300"
                  />
                ),
              }}
            />
          </span>
        </label>
        <p
          id="contact-consent-links"
          className="mt-2 pl-7 text-sm leading-relaxed text-ink-muted"
        >
          <Trans
            i18nKey="form.consent.links"
            components={{
              consent: (
                <Link
                  to={consentPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent-700 underline-offset-2 hover:underline dark:text-accent-300"
                />
              ),
              privacy: (
                <Link
                  to={privacyPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent-700 underline-offset-2 hover:underline dark:text-accent-300"
                />
              ),
            }}
          />
        </p>
        {errors.privacyConsent ? (
          <p id="contact-consent-error" className="mt-2 text-xs text-red-600 dark:text-red-400">
            {errors.privacyConsent}
          </p>
        ) : null}
      </div>

      <Button type="submit" fullWidth disabled={submitting} size="lg" aria-busy={submitting}>
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {t('form.submitting')}
          </>
        ) : (
          t('form.submit')
        )}
      </Button>
    </form>
  )
}
