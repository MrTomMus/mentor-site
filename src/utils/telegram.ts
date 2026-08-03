import { siteConfig } from '@/config/site'
import type { ContactFormData } from '@/types'

interface TelegramMessageLabels {
  title: string
  name: string
  contact: string
  level: string
  goal: string
  message: string
}

export function buildTelegramMessage(
  data: ContactFormData,
  levelLabel: string,
  labels: TelegramMessageLabels,
): string {
  return [
    labels.title,
    '',
    `${labels.name}: ${data.name.trim()}`,
    `${labels.contact}: ${data.contact.trim()}`,
    `${labels.level}: ${levelLabel}`,
    `${labels.goal}: ${data.goal.trim()}`,
    '',
    `${labels.message}:`,
    data.message.trim(),
  ].join('\n')
}

export function openTelegramChat(text: string): void {
  const url = `https://t.me/${siteConfig.telegramUsername}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
