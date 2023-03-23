import { renderWithAllProviders } from '@/utils/testUtils';

import Home from '.';

describe('pages/Home', () => {
  describe('snapshot', () => {
    it('should render and match the snapshot', () => {
      const { container } = renderWithAllProviders(<Home />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
