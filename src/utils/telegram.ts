import { siteConfig } from '@/config/site'
import { CONSENT_TEXT_ID } from '@/config/consent'
import type { ContactFormData, SupportedLocale } from '@/types'

export function buildTelegramRequestMessage(
  data: ContactFormData,
  locale: SupportedLocale,
): string {
  const email = data.email.trim()
  const telegram = data.telegram.trim().replace(/^@/, '')
  const message = data.message.trim()
  const meta = [
    locale === 'en' ? 'Consent to data processing: received' : 'Согласие на обработку данных: получено',
    `${locale === 'en' ? 'Consent version' : 'Версия согласия'}: ${CONSENT_TEXT_ID}`,
    `${locale === 'en' ? 'Submitted at' : 'Дата отправки'}: ${new Date().toISOString()}`,
    `${locale === 'en' ? 'Form language' : 'Язык формы'}: ${locale}`,
    `${locale === 'en' ? 'Page' : 'Страница'}: ${window.location.pathname}`,
  ]

  if (locale === 'en') {
    const lines = ['New mentorship request', '', `Name: ${data.name.trim()}`]
    if (email) lines.push(`Email: ${email}`)
    if (telegram) lines.push(`Telegram: @${telegram}`)
    if (message) lines.push('', 'Message:', message)
    lines.push('', ...meta)
    return lines.join('\n')
  }

  const lines = ['Новая заявка на менторство', '', `Имя: ${data.name.trim()}`]
  if (email) lines.push(`Email: ${email}`)
  if (telegram) lines.push(`Telegram: @${telegram}`)
  if (message) lines.push('', 'Сообщение:', message)
  lines.push('', ...meta)
  return lines.join('\n')
}

export function openTelegramChat(text: string): void {
  const url = `https://t.me/${siteConfig.telegramUsername}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
