import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/providers/ThemeProvider'
import { cn } from '@/utils/cn'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-ink transition-colors hover:border-accent-500/40 hover:text-accent-700 dark:hover:text-accent-300',
        className,
      )}
      aria-label={isDark ? t('aria.switchToLight') : t('aria.switchToDark')}
    >
      {isDark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
    </button>
  )
}
