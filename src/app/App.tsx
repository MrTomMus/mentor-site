import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { MainLayout } from '@/layout/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { PrivacyPage, ConsentPage } from '@/pages/LegalPages'

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/personal-data-consent" element={<ConsentPage />} />
            <Route path="/en/privacy" element={<PrivacyPage />} />
            <Route path="/en/personal-data-consent" element={<ConsentPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
