import { FC, PropsWithChildren } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import routes from '@/routes/paths';
import tokenStorage from '@/utils/tokenStorage';
import { Header } from '@/organisms/Header';
import { useLoginStore } from '@/stores/login/use-login-store';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useLoginStore();
  const authenticated = isAuthenticated || !!tokenStorage.get();

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
          {authenticated && (
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
