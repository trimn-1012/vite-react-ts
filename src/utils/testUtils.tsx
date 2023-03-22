import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement, PropsWithChildren } from 'react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { SWRConfig } from 'swr';

import ReduxProvider from '@/providers/Redux';

export function renderWithReduxProvider(
  ui: ReactElement,
  renderOptions: RenderOptions = {},
) {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <ReduxProvider>{children}</ReduxProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export function renderWithSWRConfig(
  ui: ReactElement,
  renderOptions: RenderOptions = {},
) {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <SWRConfig
      value={{
        errorRetryInterval: 3000,
        errorRetryCount: 3,
        provider: () => new Map(),
      }}
    >
      {children}
    </SWRConfig>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export function renderWithRouter(
  ui: React.ReactElement,
  {
    initialEntries,
    ...renderOptions
  }: {
    initialEntries?: MemoryRouterProps['initialEntries'];
  } & RenderOptions = {},
) {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export function renderWithAllProviders(
  ui: React.ReactElement,
  {
    initialEntries,
    ...renderOptions
  }: {
    initialEntries?: MemoryRouterProps['initialEntries'];
  } & RenderOptions = {},
) {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <ReduxProvider>
      <SWRConfig
        value={{
          errorRetryInterval: 3000,
          errorRetryCount: 3,
          provider: () => new Map(),
        }}
      >
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </SWRConfig>
    </ReduxProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
