import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { isAuthenticatedSelector } from '../../pages/Login/slice';
import routes from '../../routes/paths';
import tokenStorage from '../../utility/tokenStorage';

type Props = {
  children?: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const isAuthenticated =
    useSelector(isAuthenticatedSelector) || !!tokenStorage.get();

  const logout = () => {
    tokenStorage.remove();
    window.location.replace(routes.login.build());
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={routes.home.build()}>Home</Link>
          </li>
          {!isAuthenticated && (
            <li>
              <Link to={routes.login.build()}>Login</Link>
            </li>
          )}
          {isAuthenticated && (
            <>
              <li>
                <Link to={routes.users.build()}>Users</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
