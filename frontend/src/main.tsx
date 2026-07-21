import React from 'react';
import ReactDOM from 'react-dom/client';
import { initPolyfills } from './utils/polyfills';
import App from './App';
import './index.css';

// Initialize global cross-browser polyfills before UI rendering
initPolyfills();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
