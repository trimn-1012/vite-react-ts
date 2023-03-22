import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import store from '@/redux/store';

const ReduxProvider: FC<PropsWithChildren> = ({ children, ...rest }) => (
  <Provider store={store} {...rest}>
    {children}
  </Provider>
);

export default ReduxProvider;
