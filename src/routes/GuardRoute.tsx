import { useEffect } from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { fetchUser, keyUser } from '@/apis/getUser';
import tokenStorage from '@/utils/tokenStorage';
import { useLoginStore } from '@/stores/login/use-login-store';

import routes from './paths';

const GuardRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = tokenStorage.get();
  const { isAuthenticated, updateUser } = useLoginStore();

  const navigateToLogin = () => {
    navigate(routes.login.build(), {
      state: {
        from: location,
      },
      replace: true,
    });
  };

  useSWR(token ? `${keyUser}/${token}` : null, fetchUser, {
    revalidateOnFocus: false,
    onSuccess: updateUser,
    onError: () => {
      tokenStorage.remove();
      navigateToLogin();
    },
  });

  useEffect(() => {
    if (isAuthenticated) return;

    if (!token) {
      navigateToLogin();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) return null;

  return <Outlet />;
};

export default GuardRoute;
