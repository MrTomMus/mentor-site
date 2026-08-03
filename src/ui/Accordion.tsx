import { useId, useState, type KeyboardEvent, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utils/cn'

export interface AccordionItemData {
  id: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItemData[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)
  const baseId = useId()
  const reduceMotion = useReducedMotion()

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1
    let next = index

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      next = index === last ? 0 : index + 1
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      next = index === 0 ? last : index - 1
    } else if (event.key === 'Home') {
      event.preventDefault()
      next = 0
    } else if (event.key === 'End') {
      event.preventDefault()
      next = last
    } else {
      return
    }

    const button = document.getElementById(`${baseId}-trigger-${items[next].id}`)
    button?.focus()
  }

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => {
        const isOpen = openId === item.id
        const panelId = `${baseId}-panel-${item.id}`
        const triggerId = `${baseId}-trigger-${item.id}`

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-sm"
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink transition-colors hover:bg-surface-muted"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                onKeyDown={(e) => onKeyDown(e, index)}
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(
                    'size-5 shrink-0 text-ink-subtle transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-5 py-4 text-ink-muted">{item.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
