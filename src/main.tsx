import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign development websocket and Vite HMR errors from displaying in the preview
if (typeof window !== 'undefined') {
  const isWebsocketError = (msg: string): boolean => {
    const lowercaseMsg = String(msg).toLowerCase();
    return (
      lowercaseMsg.includes('websocket') ||
      lowercaseMsg.includes('vite') ||
      lowercaseMsg.includes('hmr') ||
      lowercaseMsg.includes('connecting')
    );
  };

  // Intercept uncaught errors
  window.addEventListener('error', (event) => {
    const msg = event.message || '';
    if (isWebsocketError(msg)) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);

  // Intercept unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const msg = event.reason?.message || String(event.reason || '');
    if (isWebsocketError(msg)) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);

  // Suppress log pollution from benign WebSocket connection attempts
  const originalError = console.error;
  console.error = function(...args: any[]) {
    const msg = args.map(arg => String(arg)).join(' ');
    if (isWebsocketError(msg)) return;
    originalError.apply(this, args);
  };

  const originalWarn = console.warn;
  console.warn = function(...args: any[]) {
    const msg = args.map(arg => String(arg)).join(' ');
    if (isWebsocketError(msg)) return;
    originalWarn.apply(this, args);
  };

  const originalLog = console.log;
  console.log = function(...args: any[]) {
    const msg = args.map(arg => String(arg)).join(' ');
    if (isWebsocketError(msg)) return;
    originalLog.apply(this, args);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

