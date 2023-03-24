import { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { isAuthenticatedSelector, userSelector } from '@/pages/Login/slice';
import routes from '@/routes/paths';
import tokenStorage from '@/utils/tokenStorage';
import { Header } from '@/organisms/Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const isAuthenticated =
    useSelector(isAuthenticatedSelector) || !!tokenStorage.get();

  const logout = () => {
    tokenStorage.remove();
    window.location.replace(routes.login.build());
  };

  const login = () => {
    navigate(routes.users.build());
  };

  return (
    <div>
      <Header user={user} onLogin={login} onLogout={logout} />
      <nav>
        <ul>
          <li>
            <Link to={routes.home.build()}>Home</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to={routes.users.build()}>Users</Link>
            </li>
          )}
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
