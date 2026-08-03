import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { MainLayout } from '@/layout/MainLayout'
import { HomePage } from '@/pages/HomePage'

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
