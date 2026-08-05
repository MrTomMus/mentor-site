import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/config/site'
import { navigation } from '@/config/navigation'
import { useScrolled } from '@/hooks/useScrolled'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeToggle } from '@/components/ThemeToggle'
import { MobileMenu } from '@/components/MobileMenu'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { goHome, goToSection } from '@/utils/scroll'
import { cn } from '@/utils/cn'

interface HeaderProps {
  onBook: () => void
}

export function Header({ onBook }: HeaderProps) {
  const { t } = useTranslation()
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border/80 bg-surface/80 shadow-sm backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <a
            href="/"
            className="font-display text-lg font-bold tracking-tight text-ink transition-colors hover:text-accent-700 dark:hover:text-accent-300"
            onClick={(e) => {
              e.preventDefault()
              goHome()
            }}
          >
            {siteConfig.shortName}
            <span className="text-accent-600">.</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`/${item.href}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                onClick={(e) => {
                  e.preventDefault()
                  goToSection(item.href)
                }}
              >
                {t(item.labelKey)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button size="sm" onClick={onBook}>
              {t('nav.book')}
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-ink lg:hidden"
            aria-label={menuOpen ? t('aria.closeMenu') : t('aria.openMenu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onBook={onBook} />
    </>
  )
}
