import { useLocation, Outlet, Navigate } from 'react-router-dom';

import tokenStorage from '@/utility/tokenStorage';

import routes from './paths';

const AuthRoute = () => {
  const location = useLocation();
  const token = tokenStorage.get();

  return token ? (
    <Navigate to={routes.users.build()} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default AuthRoute;
