import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* basename 必须和 vite.config.ts 的 base 一样 */}
    <BrowserRouter basename="/CloudMusic">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
