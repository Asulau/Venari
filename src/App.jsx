import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import TheProgram from './pages/TheProgram';
import ForCompanies from './pages/ForCompanies';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Layout from './components/Layout';
import CookieBanner from './components/CookieBanner';

// Public marketing site - no Base44 auth gate. Pages render immediately.
function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/TheProgram" element={<TheProgram />} />
            <Route path="/ForCompanies" element={<ForCompanies />} />
            <Route path="/About" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <CookieBanner />
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
