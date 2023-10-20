import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from './components/App';

import '../scss/app.scss';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
