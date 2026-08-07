import type { LucideIcon } from 'lucide-react'
import {
  Braces,
  Code2,
  FolderKanban,
  GraduationCap,
  Layers,
  Map,
  MessageSquare,
  SearchCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { HelpArea } from '@/types'
import { cn } from '@/utils/cn'

const iconMap: Record<string, LucideIcon> = {
  braces: Braces,
  code: Code2,
  layers: Layers,
  'search-check': SearchCheck,
  'message-square': MessageSquare,
  map: Map,
  'folder-kanban': FolderKanban,
  'graduation-cap': GraduationCap,
}

interface MentorCardProps {
  item: HelpArea
  className?: string
}

export function MentorCard({ item, className }: MentorCardProps) {
  const { t } = useTranslation()
  const Icon = iconMap[item.icon] ?? Code2

  return (
    <article
      className={cn(
        'group rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm transition-all duration-300',
        'hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-lg hover:shadow-accent-600/10',
        className,
      )}
    >
      <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-700 transition-colors group-hover:bg-accent-600 group-hover:text-white dark:text-accent-300">
        <Icon className="size-5" aria-hidden />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">{t(item.titleKey)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(item.descriptionKey)}</p>
    </article>
  )
}
