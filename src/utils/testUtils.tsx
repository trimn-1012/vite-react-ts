import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement, PropsWithChildren } from 'react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { SWRConfig } from 'swr';

export const SWRWrapper: FC<PropsWithChildren> = ({ children }) => (
  <SWRConfig
    value={{
      errorRetryInterval: 3000,
      errorRetryCount: 3,
      dedupingInterval: 0,
      provider: () => new Map(),
    }}
  >
    {children}
  </SWRConfig>
);

export function renderWithSWRConfig(
  ui: ReactElement,
  renderOptions: RenderOptions = {},
) {
  return render(ui, { wrapper: SWRWrapper, ...renderOptions });
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

export const AllProvidersWrapper: FC<PropsWithChildren> = ({ children }) => (
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
    <AllProvidersWrapper>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </AllProvidersWrapper>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { default as userEvent } from '@testing-library/user-event';
