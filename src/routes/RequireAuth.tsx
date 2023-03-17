import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { fetchUser, keyUser } from '../apis/getUser';
import { IUserResponse } from '../apis/getUser/types';
import { isAuthenticatedSelector, updateUser } from '../pages/Login/slice';
import tokenStorage from '../utility/tokenStorage';
import routes from './paths';

const RequireAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = tokenStorage.get();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const dispatch = useDispatch();

  const navigateToLogin = () => {
    navigate(routes.login.build(), {
      state: {
        from: location,
      },
      replace: true,
    });
  };

  useSWR<IUserResponse>(token ? `${keyUser}/${token}` : null, fetchUser, {
    revalidateOnFocus: false,
    onSuccess: data => {
      dispatch(updateUser(data));
    },
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

  if (!isAuthenticated) return <Outlet />;

  return <Outlet />;
};

export default RequireAuth;
