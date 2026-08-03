import type { SocialLink } from '@/types'
import { siteConfig } from '@/config/site'

export const socialLinks: SocialLink[] = [
  {
    id: 'telegram',
    labelKey: 'social.telegram',
    href: `https://t.me/${siteConfig.telegramUsername}`,
    external: true,
  },
  {
    id: 'github',
    labelKey: 'social.github',
    href: 'https://github.com/MrTomMus',
    external: true,
  },
  {
    id: 'linkedin',
    labelKey: 'social.linkedin',
    href: 'https://www.linkedin.com/in/sergey-bukin-006528220/',
    external: true,
  },
]
