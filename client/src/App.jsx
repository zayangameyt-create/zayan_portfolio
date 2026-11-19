import { lazy, Suspense } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import ThemeProvider from './context/ThemeProvider.jsx';
import { useTheme } from './context/ThemeContext.js';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));

function AppContent() {
  const { theme } = useTheme();

  return (
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <Suspense fallback={<main className="loading-state" role="status">Loading portfolio...</main>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-right" theme={theme} richColors closeButton />
    </LazyMotion>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
