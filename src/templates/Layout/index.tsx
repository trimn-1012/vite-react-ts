import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes/paths';

type Props = {
  children?: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={routes.home.build()}>Home</Link>
          </li>
          <li>
            <Link to={routes.login.build()}>Login</Link>
          </li>
          <li>
            <Link to={routes.users.build()}>Users</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
