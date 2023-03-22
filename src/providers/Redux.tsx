import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import store from '@/redux/store';

type Props = {
  children?: ReactNode;
};

const ReduxProvider: FC<Props> = ({ children, ...rest }) => (
  <Provider store={store} {...rest}>
    {children}
  </Provider>
);

export default ReduxProvider;
