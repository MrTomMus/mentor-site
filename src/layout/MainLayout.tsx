import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import { Modal } from '@/ui/Modal'
import { useDocumentLang } from '@/hooks/useDocumentLang'

interface ContactModalContextValue {
  openForm: () => void
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null)

export function useContactModal(): ContactModalContextValue {
  const ctx = useContext(ContactModalContext)
  if (!ctx) {
    throw new Error('useContactModal must be used within MainLayout')
  }
  return ctx
}

export function MainLayout() {
  const { t } = useTranslation()
  const [formOpen, setFormOpen] = useState(false)
  useDocumentLang()

  const openForm = useCallback(() => setFormOpen(true), [])
  const closeForm = useCallback(() => setFormOpen(false), [])

  const value = useMemo(() => ({ openForm }), [openForm])

  return (
    <ContactModalContext.Provider value={value}>
      <Header onBook={openForm} />
      <Outlet />
      <Footer />
      <Modal
        open={formOpen}
        onClose={closeForm}
        title={t('form.title')}
        description={t('form.description')}
      >
        <ContactForm key={formOpen ? 'open' : 'closed'} onSuccessClose={closeForm} />
      </Modal>
    </ContactModalContext.Provider>
  )
}
