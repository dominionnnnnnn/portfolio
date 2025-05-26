import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import LoaderWrapper from './components/LoaderWrapper'; // 👈 import this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderWrapper>
      <App />
    </LoaderWrapper>
  </StrictMode>
);
