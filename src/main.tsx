import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';     // ← router here
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
);