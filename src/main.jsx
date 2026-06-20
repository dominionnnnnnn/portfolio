import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import LoaderWrapper from './components/LoaderWrapper'; // 👈 import this
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LoaderWrapper>
        <App />
      </LoaderWrapper>
    </ThemeProvider>
  </StrictMode>
);