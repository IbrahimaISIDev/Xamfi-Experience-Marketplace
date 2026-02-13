import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Marketplace } from './pages/Marketplace'
import { Dashboard } from './pages/Dashboard'
import { ActivityDetail } from './pages/ActivityDetail'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { Toaster } from 'react-hot-toast'
import { Toaster as Sonner } from './components/ui/sonner'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="activity/:id" element={<ActivityDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />
      <Sonner />
    </BrowserRouter>
  )
}

export default App
