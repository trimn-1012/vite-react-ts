import { screen } from '@testing-library/react';

import {
  renderWithSWRConfig,
  renderWithRouter,
  renderWithAllProviders,
} from './testUtils';

const text = 'Test Component';

const TestComponent = () => <div>{text}</div>;

describe('utils/testUtils', () => {
  describe('utils/testUtils/renderWithSWRConfig', () => {
    it('should render', () => {
      renderWithSWRConfig(<TestComponent />);

      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  describe('utils/testUtils/renderWithRouter', () => {
    it('should render', () => {
      renderWithRouter(<TestComponent />);

      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should render with options', () => {
      renderWithRouter(<TestComponent />, {
        initialEntries: ['/'],
      });

      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  describe('utils/testUtils/renderWithAllProviders', () => {
    it('should render', () => {
      renderWithAllProviders(<TestComponent />);

      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should render with options', () => {
      renderWithAllProviders(<TestComponent />, {
        initialEntries: ['/'],
      });

      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
