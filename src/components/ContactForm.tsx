import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ContactFormData, ContactFormErrors, ExperienceLevel } from '@/types'
import { Button } from '@/ui/Button'
import { cn } from '@/utils/cn'
import { buildTelegramMessage, openTelegramChat } from '@/utils/telegram'

const initialData: ContactFormData = {
  name: '',
  contact: '',
  level: '',
  goal: '',
  message: '',
}

const levels: ExperienceLevel[] = ['junior', 'middle', 'senior', 'switcher']

function isValidContact(value: string): boolean {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const telegram = /^@?[a-zA-Z0-9_]{4,32}$/
  return email.test(value) || telegram.test(value)
}

interface ContactFormProps {
  onSuccessClose?: () => void
  className?: string
}

export function ContactForm({ onSuccessClose, className }: ContactFormProps) {
  const { t } = useTranslation()
  const [data, setData] = useState<ContactFormData>(initialData)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = (): ContactFormErrors => {
    const next: ContactFormErrors = {}

    if (!data.name.trim()) next.name = t('form.errors.nameRequired')
    else if (data.name.trim().length < 2) next.name = t('form.errors.nameShort')

    if (!data.contact.trim()) next.contact = t('form.errors.contactRequired')
    else if (!isValidContact(data.contact.trim())) next.contact = t('form.errors.contactInvalid')

    if (!data.level) next.level = t('form.errors.levelRequired')
    if (!data.goal.trim()) next.goal = t('form.errors.goalRequired')

    if (!data.message.trim()) next.message = t('form.errors.messageRequired')
    else if (data.message.trim().length < 10) next.message = t('form.errors.messageShort')

    return next
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)

    const levelLabel = data.level ? t(`form.levels.${data.level}`) : ''
    const text = buildTelegramMessage(data, levelLabel, {
      title: t('form.telegramTitle'),
      name: t('form.fields.name'),
      contact: t('form.fields.contact'),
      level: t('form.fields.level'),
      goal: t('form.fields.goal'),
      message: t('form.fields.message'),
    })

    // Opens Telegram with a prefilled message — the user still presses Send
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

  const fieldClass =
    'w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-accent-500'

  return (
    <form className={cn('space-y-4', className)} onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink">
          {t('form.fields.name')}
        </label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
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
        <label htmlFor="contact-contact" className="mb-1.5 block text-sm font-medium text-ink">
          {t('form.fields.contact')}
        </label>
        <input
          id="contact-contact"
          name="contact"
          autoComplete="email"
          value={data.contact}
          onChange={(e) => setData((prev) => ({ ...prev, contact: e.target.value }))}
          className={cn(fieldClass, errors.contact && 'border-red-500')}
          placeholder={t('form.fields.contactPlaceholder')}
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? 'contact-contact-error' : undefined}
        />
        {errors.contact ? (
          <p id="contact-contact-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.contact}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-level" className="mb-1.5 block text-sm font-medium text-ink">
          {t('form.fields.level')}
        </label>
        <select
          id="contact-level"
          name="level"
          value={data.level}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              level: e.target.value as ExperienceLevel | '',
            }))
          }
          className={cn(fieldClass, errors.level && 'border-red-500')}
          aria-invalid={Boolean(errors.level)}
          aria-describedby={errors.level ? 'contact-level-error' : undefined}
        >
          <option value="">{t('form.fields.levelPlaceholder')}</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {t(`form.levels.${level}`)}
            </option>
          ))}
        </select>
        {errors.level ? (
          <p id="contact-level-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.level}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-goal" className="mb-1.5 block text-sm font-medium text-ink">
          {t('form.fields.goal')}
        </label>
        <input
          id="contact-goal"
          name="goal"
          value={data.goal}
          onChange={(e) => setData((prev) => ({ ...prev, goal: e.target.value }))}
          className={cn(fieldClass, errors.goal && 'border-red-500')}
          placeholder={t('form.fields.goalPlaceholder')}
          aria-invalid={Boolean(errors.goal)}
          aria-describedby={errors.goal ? 'contact-goal-error' : undefined}
        />
        {errors.goal ? (
          <p id="contact-goal-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.goal}
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

      <Button type="submit" fullWidth disabled={submitting} size="lg">
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
