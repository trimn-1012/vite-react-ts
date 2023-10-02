import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig, SWRConfiguration } from 'swr';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const swrConfig: SWRConfiguration = {
  errorRetryInterval: 3000,
  errorRetryCount: 3,
};

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <SWRConfig value={swrConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SWRConfig>
  </StrictMode>,
);
