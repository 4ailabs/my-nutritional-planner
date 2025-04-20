import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Esto es para asegurar que el root esté disponible
const rootElement = document.getElementById('root');

if (!rootElement) {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'root';
  document.body.appendChild(rootDiv);
}

ReactDOM.createRoot(rootElement || document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);