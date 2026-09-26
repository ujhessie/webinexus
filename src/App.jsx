import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getSiteAtual } from './config/sites';

export default function App() {
  return (
    <BrowserRouter>
      {getSiteAtual()}
    </BrowserRouter>
  );
}
