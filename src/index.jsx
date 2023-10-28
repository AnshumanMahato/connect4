import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

const el = document.getElementById('root');

const root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
