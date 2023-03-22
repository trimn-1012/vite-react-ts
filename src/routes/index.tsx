import { Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Users from '@/pages/Users';
import User from '@/pages/User';
import Layout from '@/templates/Layout';
import ErrorBoundary from '@/organisms/ErrorBoundary';

import AuthRoute from './AuthRoute';
import GuardRoute from './GuardRoute';
import routes from './paths';

const RouteController = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path={routes.home.path}
          element={<Home />}
          errorElement={<ErrorBoundary />}
        />
        <Route element={<AuthRoute />} errorElement={<ErrorBoundary />}>
          <Route path={routes.login.path} element={<Login />} />
        </Route>
        <Route element={<GuardRoute />} errorElement={<ErrorBoundary />}>
          <Route path={routes.users.path}>
            <Route index element={<Users />} />
            <Route path={routes.users.pathWithParams} element={<User />} />
          </Route>
        </Route>
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Layout>
  );
};

export default RouteController;
