import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import 'tailwindcss/tailwind.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const swrConfig = {
  errorRetryInterval: 3000,
  errorRetryCount: 3,
};

export const decorators = [
  Story => (
    <SWRConfig value={swrConfig}>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </SWRConfig>
  ),
];
