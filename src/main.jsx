import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import App from './App';
import ProjectDetail from './ProjectDetail';
import './index.css';

function SmartScrollManager() {
  const { pathname } = useLocation();
  const navType = useNavigationType(); // Detects "PUSH" (new click) vs "POP" (back/forward button)
  const scrollPositions = useRef({});

  // Save scroll position continuously on scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.current[window.location.pathname] = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll positioning on route change
  useEffect(() => {
    if (navType === 'POP') {
      // Browser BACK or FORWARD button pressed -> Restore saved position
      const savedPosition = scrollPositions.current[pathname] || 0;
      window.scrollTo({ top: savedPosition, behavior: 'instant' });
    } else {
      // New link clicked (PUSH) -> Jump to top instantly
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, navType]);

  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmartScrollManager />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);