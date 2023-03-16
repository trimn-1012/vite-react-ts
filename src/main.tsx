import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig, SWRConfiguration } from 'swr';

import App from './App';
import './index.css';

const swrConfig: SWRConfiguration = {
  errorRetryInterval: 3000,
  errorRetryCount: 3,
};

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <SWRConfig value={swrConfig}>
      <App />
    </SWRConfig>
  </StrictMode>,
);
