import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { navigation } from '@/config/navigation'
import { Button } from '@/ui/Button'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeToggle } from '@/components/ThemeToggle'
import { goToSection } from '@/utils/scroll'
import { cn } from '@/utils/cn'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  onBook: () => void
}

export function MobileMenu({ open, onClose, onBook }: MobileMenuProps) {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const handleNav = (href: string) => {
    onClose()
    goToSection(href)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            aria-label={t('aria.closeMenu')}
            onClick={onClose}
          />
          <motion.nav
            className="absolute inset-x-3 top-[4.5rem] rounded-2xl border border-border bg-surface p-4 shadow-xl"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            aria-label="Mobile"
          >
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/${item.href}`}
                    className={cn(
                      'block rounded-xl px-3 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink',
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNav(item.href)
                    }}
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <Button
              fullWidth
              className="mt-4"
              onClick={() => {
                onClose()
                onBook()
              }}
            >
              {t('nav.book')}
            </Button>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
